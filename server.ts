import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

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

      // Build the chat messages
      // systemPrompt will be sent via systemInstruction if supported, 
      // but in @google/genai it's part of the configuration.
      const config: any = {
        systemInstruction: systemPrompt,
      };

      if (maxTokens) {
        config.maxOutputTokens = maxTokens;
      }

      // Generate content
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
