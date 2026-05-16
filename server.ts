import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // Supabase Admin Client
  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  // OpenAI Client for Modeling AI
  const openai = new OpenAI({
    apiKey: process.env.MODELING_AI_API_KEY || "",
    // baseURL: "https://api.deepseek.com", // Uncomment if using DeepSeek
  });

  // API Route for AI Chat via Gemini SDK
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "AI_API_KEY / GEMINI_API_KEY is missing." });
      }

      const { systemPrompt, userMessage, maxTokens } = req.body;

      if (!userMessage) {
        return res.status(400).json({ error: "userMessage is required." });
      }

      const ai = new GoogleGenAI({ apiKey });

      const config: any = {
        systemInstruction: systemPrompt,
      };

      if (maxTokens) {
        config.maxOutputTokens = maxTokens;
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userMessage,
        config: config
      });

      if (!response.text) {
        throw new Error("No response from Gemini.");
      }

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("AI API Error:", error.message || error);
      res.status(500).json({ error: error.message || "Failed to call AI API." });
    }
  });

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

      const { project_id, message } = req.body;

      if (!project_id || !message) {
        return res.status(400).json({ error: "project_id and message are required" });
      }

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

      // 2. Check token usage (Limit: 100)
      const { data: usageLogs, error: usageError } = await supabaseAdmin
        .from("ai_usage_logs")
        .select("tokens_used")
        .eq("user_id", user.id);

      if (usageError) {
        throw new Error("Failed to check usage logs");
      }

      const totalUsed = usageLogs.reduce((sum, log) => sum + (log.tokens_used || 0), 0);
      const TOKEN_LIMIT = 100;

      if (totalUsed >= TOKEN_LIMIT) {
        return res.status(403).json({ 
          error: "Token limit reached", 
          message: `You have used ${totalUsed}/${TOKEN_LIMIT} tokens. Please upgrade for more access.` 
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

      const aiResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Or another model
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
          used: totalUsed + tokensUsed,
          limit: TOKEN_LIMIT
        }
      });

    } catch (error: any) {
      console.error("Modeling AI Error:", error.message || error);
      res.status(500).json({ error: error.message || "Internal server error" });
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
