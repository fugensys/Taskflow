# TaskFlow — Modern Task Management SaaS Dashboard

TaskFlow is a modern, responsive task management SaaS dashboard built with Next.js App Router, React, TypeScript, and Tailwind CSS. Connected directly to **Supabase** via `@supabase/supabase-js` using public environment variables, it supports real database CRUD operations with Row Level Security (RLS) policies enforced.

---

## Features

- **Supabase Cloud Database**: Real-time CRUD operations against the Supabase `tasks` table with RLS policy respect.
- **Dashboard Overview**: Summary statistics for total, completed, pending, and in-progress tasks, along with completion rate tracking.
- **Task Management**: Create, edit, and delete tasks with custom titles, descriptions, categories, priorities (Low, Medium, High), and due dates.
- **Subtasks Checklist**: Break down tasks into actionable subtasks with live progress bars.
- **Kanban Board**: Column-based status transition view (Pending, In Progress, Completed).
- **Advanced Filtering & Sorting**: Filter by status, priority, and category, or search by keyword instantly.
- **Responsive SaaS UI**: Polished typography, clean neutral color palette, and mobile-friendly navigation.

---

## Getting Started

### Prerequisites

- Node.js 18+ installed on your system.
- npm or pnpm package manager.

### Environment Variables

Configure your environment variables in `.env.local` (or via AI Studio Secrets):

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### Installation & Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment (Cloudflare Pages Static Export)

TaskFlow is configured for Next.js static export (`output: 'export'`) optimized for Cloudflare Pages:

1. Build the production application:
   ```bash
   npm run build
   ```

2. Output files will be generated in the `/out` directory.

---

## Project Structure

```
├── app/
│   ├── globals.css      # Tailwind v4 import styles
│   ├── layout.tsx       # Root layout with fonts and metadata
│   └── page.tsx         # Main dashboard orchestrator
├── components/
│   ├── AnalyticsView.tsx # Analytics and productivity pulse
│   ├── Header.tsx       # Top bar contract with search & actions
│   ├── KanbanBoard.tsx  # Kanban columns view
│   ├── Sidebar.tsx      # Sidebar navigation & categories
│   ├── TaskCard.tsx     # Individual task card
│   ├── TaskList.tsx     # Filterable list view
│   └── TaskModal.tsx    # Create and edit task modal
├── hooks/
│   └── use-client.ts    # Hydration-safe client mounting hook
├── lib/
│   ├── initial-tasks.ts # Default starter mock tasks
│   ├── supabase.ts      # Supabase browser-side client initialization
│   └── tasks-service.ts # Supabase CRUD service with RLS
└── types/
    └── task.ts          # TypeScript interfaces
```

---

## License

MIT License. Built for modern engineering teams.
