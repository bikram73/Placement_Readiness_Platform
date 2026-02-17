import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Code, ClipboardCheck, BookOpen, User, FileSearch, History } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/analyze', label: 'Analyze JD', icon: FileSearch },
    { path: '/dashboard/history', label: 'History', icon: History },
    { path: '/dashboard/practice', label: 'Practice', icon: Code },
    { path: '/dashboard/assessments', label: 'Assessments', icon: ClipboardCheck },
    { path: '/dashboard/resources', label: 'Resources', icon: BookOpen },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border fixed h-full">
        <div className="p-6">
          <h2 className="text-xl font-serif font-bold text-foreground mb-10">Placement Prep</h2>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-4 rounded-md transition-colors ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-foreground hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-10">
          <div className="px-10 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-serif font-bold text-foreground">Placement Prep</h1>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-semibold">
              U
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
