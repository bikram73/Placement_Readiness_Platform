import React from 'react';
import { Card } from '../components/ui/Card';

export const DashboardHome: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-serif">Welcome back, John!</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6"><h3 className="font-semibold mb-2">Problems Solved</h3><p className="text-3xl font-bold text-primary">42</p></Card>
      <Card className="p-6"><h3 className="font-semibold mb-2">Mock Interviews</h3><p className="text-3xl font-bold text-primary">3</p></Card>
      <Card className="p-6"><h3 className="font-semibold mb-2">Assessment Score</h3><p className="text-3xl font-bold text-primary">85%</p></Card>
    </div>
  </div>
);

export const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
    <h2 className="text-2xl font-serif mb-4 text-gray-400">Coming Soon</h2>
    <h1 className="text-4xl font-bold text-foreground">{title}</h1>
  </div>
);