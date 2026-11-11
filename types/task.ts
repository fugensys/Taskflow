export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'in_progress' | 'completed';
export type Category = 'Work' | 'Engineering' | 'Design' | 'Marketing' | 'Personal' | 'Finance';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  category: Category;
  dueDate: string; // YYYY-MM-DD
  subtasks: SubTask[];
  createdAt: string;
}
