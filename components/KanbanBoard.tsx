'use client';

import React from 'react';
import { Task, Status, Category } from '@/types/task';
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import TaskCard from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  selectedCategory: Category | 'All';
}

export default function KanbanBoard({
  tasks,
  onEdit,
  onDelete,
  onToggleStatus,
  selectedCategory
}: KanbanBoardProps) {
  const filteredTasks = tasks.filter(task => {
    if (selectedCategory !== 'All' && task.category !== selectedCategory) return false;
    return true;
  });

  const columns: { id: Status; title: string; icon: React.ReactNode; color: string; border: string }[] = [
    { id: 'pending', title: 'Pending', icon: <AlertCircle className="w-4 h-4 text-slate-500" />, color: 'bg-slate-100 text-slate-700', border: 'border-slate-200' },
    { id: 'in_progress', title: 'In Progress', icon: <Clock className="w-4 h-4 text-blue-600" />, color: 'bg-blue-50 text-blue-700', border: 'border-blue-200' },
    { id: 'completed', title: 'Completed', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />, color: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-200' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {columns.map(col => {
        const columnTasks = filteredTasks.filter(t => t.status === col.id);

        return (
          <div key={col.id} className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 flex flex-col min-h-[500px]">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${col.color}`}>
                  {col.icon}
                </span>
                <h3 className="font-semibold text-slate-900 text-sm">{col.title}</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-full tabular-nums">
                {columnTasks.length}
              </span>
            </div>

            {/* Column Tasks List */}
            <div className="flex-1 space-y-3">
              {columnTasks.length > 0 ? (
                columnTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleStatus={onToggleStatus}
                  />
                ))
              ) : (
                <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs font-medium">
                  No tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
