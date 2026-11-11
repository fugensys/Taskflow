'use client';

import React from 'react';
import { Search, Plus, Bell, CheckSquare } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenNewTask: () => void;
  activeTabTitle: string;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  onOpenNewTask,
  activeTabTitle
}: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-8 sticky top-0 z-30">
      {/* Zone 1: Breadcrumb / Title */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 md:hidden bg-indigo-600 rounded-lg flex items-center justify-center text-white">
          <CheckSquare className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">{activeTabTitle}</h2>
          <p className="text-xs text-slate-500 hidden sm:block">Manage and track your team productivity</p>
        </div>
      </div>

      {/* Zone 2: Search Input */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title, description or tag..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Zone 3: Actions & Notifications */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => alert('No new notifications')}
          className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors relative cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full" />
        </button>

        <button
          onClick={onOpenNewTask}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl flex items-center gap-2 shadow-sm transition-all text-xs sm:text-sm cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Task</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
}
