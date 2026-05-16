import { supabase } from '../lib/supabase';

export interface ChatMessage {
  id: string;
  project_id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ModelingOutput {
  id: string;
  project_id: string;
  user_id: string;
  type: string;
  label: string;
  content: string;
  metadata: any;
  created_at: string;
}

export const chatService = {
  async getMessages(projectId: string) {
    const { data, error } = await supabase
      .from('modeling_messages')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data as ChatMessage[];
  },

  async saveMessage(projectId: string, role: 'user' | 'assistant', content: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('modeling_messages')
      .insert([
        { project_id: projectId, user_id: user.id, role, content }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return data as ChatMessage;
  },

  async saveOutput(projectId: string, type: string, label: string, content: string, metadata: any = {}) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('modeling_outputs')
      .insert([
        { project_id: projectId, user_id: user.id, type, label, content, metadata }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return data as ModelingOutput;
  },

  async getOutputs(projectId: string) {
    const { data, error } = await supabase
      .from('modeling_outputs')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as ModelingOutput[];
  }
};
