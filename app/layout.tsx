import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'TaskFlow — Modern Task Management SaaS Dashboard',
  description: 'Streamline your team and personal workflow with TaskFlow, the modern task management SaaS dashboard.',
  openGraph: {
    title: 'TaskFlow — Modern Task Management SaaS Dashboard',
    description: 'Streamline your team and personal workflow with TaskFlow.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskFlow — Modern Task Management SaaS Dashboard',
    description: 'Streamline your team and personal workflow with TaskFlow.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Plus_Jakarta_Sans',sans-serif] bg-slate-50 text-slate-900 antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}

