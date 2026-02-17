import React from 'react';
import { Badge } from '../ui/Badge';

interface AppShellProps {
  projectName: string;
  stepCurrent: number;
  stepTotal: number;
  status: 'Not Started' | 'In Progress' | 'Shipped';
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ 
  projectName, 
  stepCurrent, 
  stepTotal, 
  status, 
  children 
}) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      
      {/* TOP BAR */}
      <header className="h-16 border-b border-border flex items-center justify-between px-10 bg-background shrink-0 z-10">
        <div className="font-serif font-bold text-lg tracking-tight">{projectName}</div>
        <div className="text-sm font-medium text-gray-500">
          Step {stepCurrent} <span className="text-gray-300 mx-2">/</span> {stepTotal}
        </div>
        <Badge status={status} />
      </header>

      {/* MAIN CONTENT AREA (Scrollable) */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        {children}
      </main>

      {/* PROOF FOOTER (Persistent) */}
      <footer className="h-16 border-t border-border bg-white flex items-center px-10 shrink-0 justify-between">
        <div className="text-sm font-serif text-gray-500 mr-6">Proof of Work</div>
        <div className="flex space-x-10">
          {['UI Built', 'Logic Working', 'Test Passed', 'Deployed'].map((item) => (
            <label key={item} className="flex items-center space-x-2 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent transition duration-150" 
              />
              <span className="text-sm text-primary/70 group-hover:text-primary transition-colors">{item}</span>
            </label>
          ))}
        </div>
      </footer>
    </div>
  );
};
