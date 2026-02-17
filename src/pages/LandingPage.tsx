import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Code, Video, TrendingUp } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Code,
      title: 'Practice Problems',
      description: 'Solve coding challenges to sharpen your technical skills'
    },
    {
      icon: Video,
      title: 'Mock Interviews',
      description: 'Prepare with realistic interview simulations and feedback'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="flex items-center justify-center px-4 py-16 md:py-16">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Ace Your Placement
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-reading mx-auto">
            Practice, assess, and prepare for your dream job
          </p>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="px-10 py-4 text-lg"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <div className="flex justify-center mb-6">
                <feature.icon className="w-12 h-12 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-600 border-t border-border mt-16">
        <p>&copy; 2024 Placement Readiness Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};
