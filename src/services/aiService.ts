export interface AIRequestOptions {
  feature: string;
  userMessage: string;
  context?: string;
  maxTokens?: number;
}

const TOKEN_LIMIT_KEY = 'mm_used_tokens';
const MAX_TOTAL_TOKENS = 10000000;

export async function callAI(options: AIRequestOptions): Promise<string> {
  const { feature, userMessage, context, maxTokens } = options;
  
  if (!userMessage.trim()) {
    throw new Error('User message cannot be empty.');
  }

  // Check limits
  const usedTokens = parseInt(localStorage.getItem(TOKEN_LIMIT_KEY) || '0', 10);
  if (usedTokens >= MAX_TOTAL_TOKENS) {
    throw new Error('You have reached your AI usage limit.');
  }

  const systemPrompt = `You are ModelMate, an AI learning assistant for mathematical modeling.
You help users learn, analyze problems, select models, write papers, explain formulas, understand code, and generate learning suggestions.
You must not pretend to control the user, manipulate the user, force decisions, request sensitive personal data, or take actions outside the app.
You only provide educational suggestions and explanations.
The user always makes the final decision.

Current Feature Focus: ${feature}
${context ? 'Additional Context: ' + context : ''}`;

  const response = await fetch('/api/ai-chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemPrompt,
      userMessage,
      maxTokens,
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to generate AI response.');
  }

  const text = data.text;
  
  // Estimate tokens (very rough approximation: 1 token = 4 chars)
  const estimatedTokens = Math.ceil((userMessage.length + text.length + systemPrompt.length) / 4);
  const newUsedTokens = usedTokens + estimatedTokens;
  localStorage.setItem(TOKEN_LIMIT_KEY, newUsedTokens.toString());

  return text;
}

export function getAITokenUsage() {
  const usedTokens = parseInt(localStorage.getItem(TOKEN_LIMIT_KEY) || '0', 10);
  return {
    usedTokens,
    remainingTokens: Math.max(0, MAX_TOTAL_TOKENS - usedTokens),
    totalTokens: MAX_TOTAL_TOKENS
  };
}
