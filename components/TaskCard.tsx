'use client';

import React from 'react';
import { Calendar, CheckCircle2, Clock, AlertCircle, MoreVertical, Edit3, Trash2, CheckSquare } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleStatus
}: TaskCardProps) {
  const completedSubtasks = task.subtasks.filter(s => s.completed).length;
  const totalSubtasks = task.subtasks.length;

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all shadow-xs flex flex-col justify-between group">
      <div>
        {/* Top Row: Category & Priority & Actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className={`w-2 h-2 rounded-full ${
              task.category === 'Engineering' ? 'bg-blue-500' :
              task.category === 'Design' ? 'bg-purple-500' :
              task.category === 'Marketing' ? 'bg-amber-500' :
              task.category === 'Finance' ? 'bg-emerald-500' :
              task.category === 'Personal' ? 'bg-rose-500' : 'bg-indigo-500'
            }`} />
            <span>{task.category}</span>
            <span aria-hidden="true">·</span>
            <span className={`capitalize ${
              task.priority === 'high' ? 'text-rose-600 font-semibold' :
              task.priority === 'medium' ? 'text-amber-600' : 'text-slate-500'
            }`}>
              {task.priority} priority
            </span>
          </div>

          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              title="Edit Task"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Delete Task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Task Title */}
        <h4 className="font-semibold text-slate-900 text-base mb-1.5 line-clamp-1">
          {task.title}
        </h4>

        {/* Description */}
        <p className="text-slate-600 text-xs line-clamp-2 mb-4 leading-relaxed">
          {task.description || 'No additional description provided.'}
        </p>

        {/* Subtasks Progress if any */}
        {totalSubtasks > 0 && (
          <div className="mb-4 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                <span>Subtasks</span>
              </div>
              <span className="tabular-nums">{completedSubtasks}/{totalSubtasks}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer: Due Date & Status Toggle */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className={`flex items-center gap-1.5 text-xs font-medium ${isOverdue ? 'text-rose-600' : 'text-slate-500'}`}>
          <Calendar className="w-3.5 h-3.5" />
          <span>Due {task.dueDate}</span>
          {isOverdue && <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-semibold ml-1">Overdue</span>}
        </div>

        <button
          onClick={() => onToggleStatus(task.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            task.status === 'completed'
              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              : task.status === 'in_progress'
              ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {task.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          {task.status === 'in_progress' && <Clock className="w-3.5 h-3.5 text-blue-600" />}
          {task.status === 'pending' && <AlertCircle className="w-3.5 h-3.5 text-slate-500" />}
          <span className="capitalize">{task.status.replace('_', ' ')}</span>
        </button>
      </div>
    </div>
  );
}
