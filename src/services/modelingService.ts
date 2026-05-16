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

export async function sendModelingMessage(params: ModelingChatRequest): Promise<ModelingChatResponse> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    throw new Error('User must be authenticated to use the AI Workbench.');
  }

  const response = await fetch('/api/modeling/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`
    },
    body: JSON.stringify(params)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to communicate with Modeling AI.');
  }

  return data;
}
