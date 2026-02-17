import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Video, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 bg-background">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-foreground">
          Ace Your Placement
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl">
          Practice, assess, and prepare for your dream job with our comprehensive readiness platform.
        </p>
        <Button 
          onClick={() => navigate('/dashboard')}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg h-auto"
        >
          Get Started
        </Button>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-white border-t border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Code2 className="w-8 h-8 text-primary" />}
            title="Practice Problems"
            description="Solve curated coding challenges to sharpen your algorithmic skills."
          />
          <FeatureCard 
            icon={<Video className="w-8 h-8 text-primary" />}
            title="Mock Interviews"
            description="Simulate real interview scenarios with AI-driven feedback."
          />
          <FeatureCard 
            icon={<BarChart3 className="w-8 h-8 text-primary" />}
            title="Track Progress"
            description="Visualize your growth and identify areas for improvement."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-border bg-background">
        © 2024 Placement Readiness Platform. All rights reserved.
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="flex flex-col items-start p-8 hover:border-primary/50 transition-colors">
    <div className="mb-4 p-3 bg-primary/10 rounded-lg">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </Card>
);