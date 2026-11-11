'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Kanban, 
  BarChart3, 
  FolderKanban, 
  Plus, 
  ShieldCheck, 
  Settings,
  HelpCircle
} from 'lucide-react';
import { Category } from '@/types/task';

interface SidebarProps {
  activeTab: 'dashboard' | 'list' | 'kanban' | 'analytics';
  setActiveTab: (tab: 'dashboard' | 'list' | 'kanban' | 'analytics') => void;
  selectedCategory: Category | 'All';
  setSelectedCategory: (cat: Category | 'All') => void;
  onOpenNewTask: () => void;
  counts: {
    total: number;
    pending: number;
    in_progress: number;
    completed: number;
  };
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  onOpenNewTask,
  counts
}: SidebarProps) {
  const categories: (Category | 'All')[] = ['All', 'Work', 'Engineering', 'Design', 'Marketing', 'Personal', 'Finance'];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0 hidden md:flex">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 tracking-tight text-lg">TaskFlow</h1>
            <p className="text-xs text-slate-500">SaaS Workspace</p>
          </div>
        </div>
      </div>

      {/* Primary Action */}
      <div className="p-4">
        <button
          onClick={onOpenNewTask}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-indigo-200 transition-all text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        <div>
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Overview</p>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                {counts.total}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('list')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'list'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckSquare className="w-4 h-4" />
                <span>Task List</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md">
                {counts.pending + counts.in_progress}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('kanban')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'kanban'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Kanban className="w-4 h-4" />
                <span>Kanban Board</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Categories Section */}
        <div>
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Categories</p>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${
                    cat === 'All' ? 'bg-indigo-500' :
                    cat === 'Engineering' ? 'bg-blue-500' :
                    cat === 'Design' ? 'bg-purple-500' :
                    cat === 'Marketing' ? 'bg-amber-500' :
                    cat === 'Finance' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`} />
                  <span>{cat}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Workspace Footer */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">Jane Doe</p>
            <p className="text-[11px] text-slate-500 truncate">jane@taskflow.io</p>
          </div>
          <div title="Verified Workspace" className="shrink-0 flex items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
      </div>
    </aside>
  );
}
