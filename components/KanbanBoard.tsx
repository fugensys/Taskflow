'use client';

import React from 'react';
import { Task, Status, Category } from '@/types/task';
import { AlertCircle, Clock, CheckCircle2, MoreVertical, Edit3, Trash2, Calendar, CheckSquare } from 'lucide-react';

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
                columnTasks.map(task => {
                  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
                  const totalSubtasks = task.subtasks.length;
                  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

                  return (
                    <div
                      key={task.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-all shadow-xs group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            task.category === 'Engineering' ? 'bg-blue-500' :
                            task.category === 'Design' ? 'bg-purple-500' :
                            task.category === 'Marketing' ? 'bg-amber-500' :
                            task.category === 'Finance' ? 'bg-emerald-500' : 'bg-indigo-500'
                          }`} />
                          {task.category}
                        </span>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEdit(task)}
                            className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDelete(task.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-1">
                        {task.title}
                      </h4>
                      <p className="text-slate-500 text-xs line-clamp-2 mb-3">
                        {task.description || 'No description provided.'}
                      </p>

                      {totalSubtasks > 0 && (
                        <div className="mb-3 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                          <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{completedSubtasks}/{totalSubtasks} subtasks</span>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className={`text-[11px] font-medium flex items-center gap-1 ${isOverdue ? 'text-rose-600' : 'text-slate-500'}`}>
                          <Calendar className="w-3 h-3" />
                          {task.dueDate}
                        </span>

                        <button
                          onClick={() => onToggleStatus(task.id)}
                          className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                        >
                          {task.status === 'pending' ? 'Start →' : task.status === 'in_progress' ? 'Complete ✓' : 'Reopen ↺'}
                        </button>
                      </div>
                    </div>
                  );
                })
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
