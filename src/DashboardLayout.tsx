import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Code2, FileCheck, BookOpen, User } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Code2, label: 'Practice', path: '/dashboard/practice' },
    { icon: FileCheck, label: 'Assessments', path: '/dashboard/assessments' },
    { icon: BookOpen, label: 'Resources', path: '/dashboard/resources' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-border flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="font-serif font-bold text-lg text-primary">Placement Prep</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-foreground'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 shrink-0">
          <h2 className="font-serif text-xl font-semibold">Dashboard</h2>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            JD
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};