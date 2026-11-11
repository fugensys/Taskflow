'use client';

import React, { useState, useEffect } from 'react';
import { Task, Category, Status } from '@/types/task';
import { INITIAL_TASKS } from '@/lib/initial-tasks';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import KanbanBoard from '@/components/KanbanBoard';
import AnalyticsView from '@/components/AnalyticsView';
import TaskModal from '@/components/TaskModal';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  LayoutDashboard, 
  CheckSquare, 
  Kanban, 
  BarChart3,
  Calendar,
  ArrowRight
} from 'lucide-react';

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === 'undefined') return INITIAL_TASKS;
    const saved = localStorage.getItem('taskflow_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved tasks', e);
      }
    }
    return INITIAL_TASKS;
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'list' | 'kanban' | 'analytics'>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Counts
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const pending = tasks.filter(t => t.status === 'pending').length;

  // Search filtered tasks
  const searchedTasks = tasks.filter(t => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
  });

  // Handlers
  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'> & { id?: string }) => {
    if (taskData.id) {
      // Edit existing
      setTasks(tasks.map(t => t.id === taskData.id ? { ...t, ...taskData } : t));
    } else {
      // Create new
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        category: taskData.category,
        dueDate: taskData.dueDate,
        subtasks: taskData.subtasks,
        createdAt: new Date().toISOString()
      };
      setTasks([newTask, ...tasks]);
    }
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id !== id) return t;
      const nextStatus: Status = 
        t.status === 'pending' ? 'in_progress' :
        t.status === 'in_progress' ? 'completed' : 'pending';
      return { ...t, status: nextStatus };
    }));
  };

  const handleOpenNewTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const activeTabTitle = 
    activeTab === 'dashboard' ? 'Dashboard Overview' :
    activeTab === 'list' ? 'Task Manager' :
    activeTab === 'kanban' ? 'Kanban Sprint Board' : 'Workspace Analytics';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenNewTask={handleOpenNewTask}
        counts={{ total, pending, in_progress: inProgress, completed }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenNewTask={handleOpenNewTask}
          activeTabTitle={activeTabTitle}
        />

        {/* Mobile Navigation Bar */}
        <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-around md:hidden overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'list' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'kanban' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Kanban</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 whitespace-nowrap ${activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="relative z-10 max-w-xl">
                  <span className="text-xs font-semibold tracking-wider uppercase bg-indigo-500/30 px-3 py-1 rounded-full text-indigo-200 mb-3 inline-block">
                    Workspace Overview
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                    Welcome back, Jane 👋
                  </h2>
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    You have <span className="font-semibold text-white">{inProgress + pending} active tasks</span> requiring your attention today. Keep up the momentum!
                  </p>
                </div>
                <div className="relative z-10 flex items-center gap-3 shrink-0">
                  <button
                    onClick={handleOpenNewTask}
                    className="bg-white hover:bg-indigo-50 text-indigo-900 font-semibold px-5 py-3 rounded-2xl text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Task</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('kanban')}
                    className="bg-indigo-700/60 hover:bg-indigo-700 text-white font-medium px-5 py-3 rounded-2xl text-sm transition-all border border-indigo-500/30 flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Kanban</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Tasks</span>
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 tabular-nums">{total}</p>
                  <p className="text-xs text-slate-500 mt-2">Across all categories</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 tabular-nums">{completed}</p>
                  <p className="text-xs text-emerald-600 font-semibold mt-2">
                    {total > 0 ? Math.round((completed / total) * 100) : 0}% completion rate
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Progress</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 tabular-nums">{inProgress}</p>
                  <p className="text-xs text-blue-600 font-semibold mt-2">Active sprints</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 tabular-nums">{pending}</p>
                  <p className="text-xs text-amber-600 font-semibold mt-2">Queued for review</p>
                </div>
              </div>

              {/* Recent Tasks Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Recent Tasks</h3>
                    <p className="text-xs text-slate-500">Showing latest tasks across your workspace</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('list')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Tasks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <TaskList
                  tasks={searchedTasks.slice(0, 6)}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onToggleStatus={handleToggleStatus}
                  onOpenNewTask={handleOpenNewTask}
                  selectedCategory={selectedCategory}
                />
              </div>
            </div>
          )}

          {activeTab === 'list' && (
            <TaskList
              tasks={searchedTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleStatus={handleToggleStatus}
              onOpenNewTask={handleOpenNewTask}
              selectedCategory={selectedCategory}
            />
          )}

          {activeTab === 'kanban' && (
            <KanbanBoard
              tasks={searchedTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleStatus={handleToggleStatus}
              selectedCategory={selectedCategory}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView tasks={tasks} />
          )}
        </main>
      </div>

      {/* Task Modal (Create / Edit) */}
      <TaskModal
        key={editingTask ? editingTask.id : 'new-task-modal'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />
    </div>
  );
}
