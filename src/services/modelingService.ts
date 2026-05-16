import { supabase } from '../lib/supabase';

export interface ModelingChatRequest {
  project_id?: string;
  message: string;
}

export interface ModelingChatResponse {
  message_id: string;
  content: string;
  parsed: any;
  outputs: any[];
  usage: {
    used: number;
    limit: number;
  };
}

export class ModelingAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ModelingAuthError';
  }
}

export function isModelingAuthError(error: unknown) {
  return error instanceof ModelingAuthError || (error as any)?.name === 'ModelingAuthError';
}

export async function sendModelingMessage(params: ModelingChatRequest): Promise<ModelingChatResponse> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new ModelingAuthError('请先登录后再使用 AI Workbench。');
  }

  const response = await fetch('/api/modeling/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`
    },
    body: JSON.stringify(params)
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    await supabase.auth.signOut();
    throw new ModelingAuthError(data.error === 'Invalid or expired token'
      ? '登录状态已过期，请重新登录。'
      : '请先登录后再使用 AI Workbench。'
    );
  }

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Failed to communicate with Modeling AI.');
  }

  return data;
}
