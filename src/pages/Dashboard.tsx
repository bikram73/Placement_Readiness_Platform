import React from 'react';
import { Card } from '../components/ui/Card';
import { Code, ClipboardCheck, BookOpen, TrendingUp } from 'lucide-react';

export const DashboardHome: React.FC = () => {
  const stats = [
    { label: 'Problems Solved', value: '24', icon: Code, color: 'text-accent' },
    { label: 'Assessments Taken', value: '8', icon: ClipboardCheck, color: 'text-success' },
    { label: 'Resources Read', value: '12', icon: BookOpen, color: 'text-foreground' },
    { label: 'Current Streak', value: '5 days', icon: TrendingUp, color: 'text-warning' },
  ];

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold mb-10">Welcome Back!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-10 h-10 ${stat.color}`} />
              </div>
              <p className="text-3xl font-serif font-bold mb-2">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-serif font-semibold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-4 border-b border-border">
              <span className="text-foreground">Completed Array Problems</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-border">
              <span className="text-foreground">Took DSA Assessment</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-foreground">Read System Design Guide</span>
              <span className="text-sm text-gray-500">2 days ago</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-serif font-semibold mb-6">Recommended Next Steps</h3>
          <div className="space-y-4">
            <div className="p-4 bg-background rounded-md border border-border">
              <p className="font-medium text-foreground mb-2">Practice Dynamic Programming</p>
              <p className="text-sm text-gray-600">Complete 5 more problems</p>
            </div>
            <div className="p-4 bg-background rounded-md border border-border">
              <p className="font-medium text-foreground mb-2">Take Mock Interview</p>
              <p className="text-sm text-gray-600">Schedule your next session</p>
            </div>
            <div className="p-4 bg-background rounded-md border border-border">
              <p className="font-medium text-foreground mb-2">Review Data Structures</p>
              <p className="text-sm text-gray-600">Refresh your knowledge</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600">This page is under construction.</p>
    </div>
  );
};
