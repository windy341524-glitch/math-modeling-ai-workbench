import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_PORT = 3000;
const aiBaseURL = process.env.AI_API_BASE_URL || process.env.MODELING_AI_BASE_URL || undefined;
const aiApiKey = process.env.MODELING_AI_API_KEY || process.env.AI_API_KEY || "";
const aiModel = process.env.AI_MODEL || (aiBaseURL?.includes("deepseek") ? "deepseek-chat" : "gpt-4o-mini");
const aiTimeout = parseInt(process.env.AI_TIMEOUT_MS || "120000", 10);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10);

  // Middleware to parse JSON
  app.use(express.json());

  // Supabase Admin Client
  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  // OpenAI Client for Modeling AI
  const openai = new OpenAI({
    apiKey: aiApiKey,
    baseURL: aiBaseURL,
    timeout: aiTimeout,
    maxRetries: 1,
  });

  // No more legacy /api/ai-chat. All calls must go through authenticated /api/modeling/chat.

  // NEW: Mathematical Modeling AI Chat Endpoint
  app.post("/api/modeling/chat", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
      }

      const token = authHeader.replace("Bearer ", "");
      const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

      if (authError || !user) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      let { project_id, message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "message is required" });
      }

      // If no project_id, find or create a default "General" project for this user
      if (!project_id) {
        const { data: defaultProject, error: findError } = await supabaseAdmin
          .from("modeling_projects")
          .select("id")
          .eq("user_id", user.id)
          .eq("title", "通用 AI 助手")
          .maybeSingle();

        if (findError) throw new Error("Failed to search for default project");

        if (defaultProject) {
          project_id = defaultProject.id;
        } else {
          const { data: newProject, error: createError } = await supabaseAdmin
            .from("modeling_projects")
            .insert({
              user_id: user.id,
              title: "通用 AI 助手",
              description: "用于课程答疑和通用数学建模咨询的项目",
              status: "active"
            })
            .select()
            .single();
          
          if (createError) throw new Error("Failed to create default project");
          project_id = newProject.id;
        }
      } else {
        // 1. Check project ownership
        const { data: project, error: projectError } = await supabaseAdmin
          .from("modeling_projects")
          .select("id")
          .eq("id", project_id)
          .eq("user_id", user.id)
          .single();

        if (projectError || !project) {
          return res.status(403).json({ error: "Project not found or access denied" });
        }
      }

      // 2. Check daily token usage (Limit: 10,000)
      const { data: usageLogs, error: usageError } = await supabaseAdmin
        .from("ai_usage_logs")
        .select("tokens_used")
        .eq("user_id", user.id)
        .gt("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      if (usageError) {
        throw new Error("Failed to check usage logs");
      }

      const dailyUsed = usageLogs.reduce((sum, log) => sum + (log.tokens_used || 0), 0);
      const DAILY_LIMIT = parseInt(process.env.DAILY_TOKEN_LIMIT || "10000", 10);

      if (dailyUsed >= DAILY_LIMIT) {
        return res.status(403).json({ 
          error: "Daily token limit reached", 
          message: `You have used ${dailyUsed}/${DAILY_LIMIT} tokens today. Please come back tomorrow or upgrade for more access.` 
        });
      }

      // 3. Call AI API
      const systemPrompt = `You are a "Mathematical Modeling Assistant". Your goal is to help users through the entire mathematical modeling process.
You must provide a structured response in JSON format.
Include the following fields:
- content: A full, detailed mathematical modeling report in Markdown format. 
  - Use LaTeX for ALL mathematical formulas (e.g., $E=mc^2$ or $$...$$).
  - Use \`\`\`mermaid ... \`\`\` blocks for flowcharts.
  - Use \`\`\`json:echarts ... \`\`\` blocks for ECharts configurations.
  - Use \`\`\`python ... \`\`\` or \`\`\`matlab ... \`\`\` for code.
- analysis: Brief problem analysis.
- assumptions: List of assumptions.
- variables: List of variables.
- latex: Array of key LaTeX formulas.
- mermaid: Array of Mermaid chart definitions.
- echarts: Array of ECharts option objects.
- code: Solving code snippets.

Constraints:
- Focus strictly on mathematical modeling.
- Do not perform SQL operations or modify system configurations.
- Always return a valid JSON object.`;

      if (!aiApiKey) {
        return res.status(500).json({ error: "AI API key is not configured" });
      }

      const aiResponse = await openai.chat.completions.create({
        model: aiModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        response_format: { type: "json_object" }
      });

      const responseJson = aiResponse.choices[0].message.content;
      if (!responseJson) throw new Error("Empty response from AI");

      const parsedContent = JSON.parse(responseJson);
      const displayContent = parsedContent.content || "No detailed report generated.";
      const tokensUsed = aiResponse.usage?.total_tokens || 0;

      // 4. Save to database
      // Save user message
      await supabaseAdmin.from("modeling_messages").insert({
        project_id,
        user_id: user.id,
        role: "user",
        content: message
      });

      // Save AI message
      const { data: assistantMsg, error: msgError } = await supabaseAdmin
        .from("modeling_messages")
        .insert({
          project_id,
          user_id: user.id,
          role: "assistant",
          content: displayContent
        })
        .select()
        .single();

      if (msgError) console.error("Failed to save assistant message:", msgError);

      // Save structured outputs
      const outputs = [];
      const outputTypes = ['latex', 'mermaid', 'echarts', 'code'];
      for (const type of outputTypes) {
        if (parsedContent[type]) {
          const { data: outputData } = await supabaseAdmin.from("modeling_outputs").insert({
            project_id,
            user_id: user.id,
            type,
            content: typeof parsedContent[type] === 'string' ? parsedContent[type] : JSON.stringify(parsedContent[type]),
            label: `Generated ${type}`
          }).select().single();
          if (outputData) outputs.push(outputData);
        }
      }

      // Log usage
      await supabaseAdmin.from("ai_usage_logs").insert({
        user_id: user.id,
        feature: "modeling_chat",
        tokens_used: tokensUsed
      });

      res.json({
        message_id: assistantMsg?.id,
        content: displayContent,
        parsed: parsedContent,
        outputs: outputs,
        usage: {
          used: dailyUsed + tokensUsed,
          limit: DAILY_LIMIT
        }
      });

    } catch (error: any) {
      const message = error.message || "Internal server error";
      console.error("Modeling AI Error:", message);

      if (/timeout|timed out/i.test(message)) {
        return res.status(504).json({
          error: "AI service timed out",
          message: "AI 服务响应超时，请检查 AI_API_BASE_URL / AI_MODEL 是否匹配当前 API Key，或稍后重试。"
        });
      }

      res.status(500).json({ error: message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
