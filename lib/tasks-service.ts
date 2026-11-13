import { supabase, isSupabaseConfigured } from './supabase';
import { Task } from '@/types/task';

export async function fetchTasksFromSupabase(): Promise<Task[]> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }

  if (!data) {
    return [];
  }

  return data.map((row: any) => ({
    id: row.id,
    title: row.title,
    description: row.description || '',
    status: row.status || 'pending',
    priority: row.priority || 'medium',
    category: row.category || 'Work',
    dueDate: row.due_date || row.dueDate || new Date().toISOString().split('T')[0],
    subtasks: row.subtasks || [],
    createdAt: row.created_at || row.createdAt || new Date().toISOString()
  }));
}

export async function saveTaskToSupabase(taskData: Omit<Task, 'id' | 'createdAt'> & { id?: string }): Promise<Task> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }

  const dbPayload = {
    title: taskData.title,
    description: taskData.description || '',
    status: taskData.status || 'pending',
    priority: taskData.priority || 'medium',
    category: taskData.category || 'Work',
    due_date: taskData.dueDate,
    subtasks: taskData.subtasks || [],
    updated_at: new Date().toISOString()
  };

  // If id is provided and is a valid database record (not a temp mock id starting with task-)
  if (taskData.id && !taskData.id.startsWith('task-')) {
    const { data, error } = await supabase
      .from('tasks')
      .update(dbPayload)
      .eq('id', taskData.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update task: ${error.message}`);
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description || '',
      status: data.status,
      priority: data.priority,
      category: data.category,
      dueDate: data.due_date || data.dueDate,
      subtasks: data.subtasks || [],
      createdAt: data.created_at || data.createdAt
    };
  } else {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        ...dbPayload,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create task: ${error.message}`);
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description || '',
      status: data.status,
      priority: data.priority,
      category: data.category,
      dueDate: data.due_date || data.dueDate,
      subtasks: data.subtasks || [],
      createdAt: data.created_at || data.createdAt
    };
  }
}

export async function deleteTaskFromSupabase(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }

  return true;
}
