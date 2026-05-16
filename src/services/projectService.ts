import { supabase } from '../lib/supabase';

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const projectService = {
  async getProjects() {
    const { data, error } = await supabase
      .from('modeling_projects')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data as Project[];
  },

  async getProjectById(id: string) {
    const { data, error } = await supabase
      .from('modeling_projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  async createProject(title: string, description: string = '') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('modeling_projects')
      .insert([
        { title, description, user_id: user.id }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  async updateProject(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('modeling_projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  async deleteProject(id: string) {
    const { error } = await supabase
      .from('modeling_projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};
