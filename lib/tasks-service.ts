import { supabase, isSupabaseConfigured } from './supabase';
import { Task } from '@/types/task';
import { INITIAL_TASKS } from './initial-tasks';

export async function fetchTasksFromSupabase(): Promise<Task[]> {
  if (!isSupabaseConfigured || !supabase) {
    return INITIAL_TASKS;
  }

  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error.message);
      return INITIAL_TASKS;
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Map database columns to Task type
    return data.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description || '',
      status: row.status || 'pending',
      priority: row.priority || 'medium',
      category: row.category || 'Work',
      dueDate: row.due_date || row.dueDate || new Date().toISOString().split('T')[0],
      subtasks: row.subtasks || [],
      createdAt: row.created_at || new Date().toISOString()
    }));
  } catch (err) {
    console.error('Supabase exception during fetch:', err);
    return INITIAL_TASKS;
  }
}

export async function saveTaskToSupabase(taskData: Omit<Task, 'id' | 'createdAt'> & { id?: string }): Promise<Task> {
  const newTaskObj: Task = {
    id: taskData.id || `task-${Date.now()}`,
    title: taskData.title,
    description: taskData.description,
    status: taskData.status,
    priority: taskData.priority,
    category: taskData.category,
    dueDate: taskData.dueDate,
    subtasks: taskData.subtasks,
    createdAt: new Date().toISOString()
  };

  if (!isSupabaseConfigured || !supabase) {
    return newTaskObj;
  }

  try {
    const dbPayload = {
      title: newTaskObj.title,
      description: newTaskObj.description,
      status: newTaskObj.status,
      priority: newTaskObj.priority,
      category: newTaskObj.category,
      due_date: newTaskObj.dueDate,
      subtasks: newTaskObj.subtasks
    };

    if (taskData.id) {
      // Update
      const { data, error } = await supabase
        .from('tasks')
        .update(dbPayload)
        .eq('id', taskData.id)
        .select()
        .single();

      if (error) {
        console.error('Supabase update error:', error.message);
      } else if (data) {
        return {
          id: data.id,
          title: data.title,
          description: data.description || '',
          status: data.status,
          priority: data.priority,
          category: data.category,
          dueDate: data.due_date || data.dueDate,
          subtasks: data.subtasks || [],
          createdAt: data.created_at
        };
      }
    } else {
      // Insert
      const { data, error } = await supabase
        .from('tasks')
        .insert([dbPayload])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error.message);
      } else if (data) {
        return {
          id: data.id,
          title: data.title,
          description: data.description || '',
          status: data.status,
          priority: data.priority,
          category: data.category,
          dueDate: data.due_date || data.dueDate,
          subtasks: data.subtasks || [],
          createdAt: data.created_at
        };
      }
    }
  } catch (err) {
    console.error('Supabase exception during save:', err);
  }

  return newTaskObj;
}

export async function deleteTaskFromSupabase(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return true;
  }

  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase exception during delete:', err);
    return false;
  }
}
