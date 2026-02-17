import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { getAnalysisById, AnalysisHistory } from '../utils/historyStorage';

export const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AnalysisHistory | null>(null);

  useEffect(() => {
    if (id) {
      const data = getAnalysisById(id);
      if (data) {
        setAnalysis(data);
      } else {
        navigate('/dashboard/analyze');
      }
    }
  }, [id, navigate]);

  if (!analysis) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const { company, role, extractedSkills, readinessScore, checklist, plan, questions, createdAt } = analysis;

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => navigate('/dashboard/history')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to History
      </Button>

      <div className="mb-10">
        <h1 className="text-4xl font-serif font-bold mb-2">{company}</h1>
        <p className="text-xl text-gray-600 mb-2">{role}</p>
        <p className="text-sm text-gray-500">
          Analyzed on {new Date(createdAt).toLocaleDateString()} at {new Date(createdAt).toLocaleTimeString()}
        </p>
      </div>

      {/* Readiness Score */}
      <Card className="mb-6 bg-accent/5 border-accent/20">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 mb-2">Overall Readiness Score</p>
          <p className="text-6xl font-serif font-bold text-accent mb-2">{readinessScore}</p>
          <p className="text-sm text-gray-600">out of 100</p>
        </div>
      </Card>

      {/* Extracted Skills */}
      <Card className="mb-6">
        <h2 className="text-2xl font-serif font-bold mb-6">Key Skills Extracted</h2>
        <div className="space-y-4">
          {Object.entries(extractedSkills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-background border border-border rounded-md text-sm font-medium text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Round-wise Checklist */}
      <Card className="mb-6">
        <h2 className="text-2xl font-serif font-bold mb-6">Round-wise Preparation Checklist</h2>
        <div className="space-y-6">
          {Object.entries(checklist).map(([round, items]) => (
            <div key={round}>
              <h3 className="text-lg font-serif font-semibold mb-4 text-accent">{round}</h3>
              <div className="space-y-2">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 7-Day Plan */}
      <Card className="mb-6">
        <h2 className="text-2xl font-serif font-bold mb-6">7-Day Preparation Plan</h2>
        <div className="space-y-6">
          {Object.entries(plan).map(([day, tasks]) => (
            <div key={day} className="border-l-4 border-accent pl-6">
              <h3 className="text-lg font-serif font-semibold mb-4">{day}</h3>
              <ul className="space-y-2">
                {tasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <p className="text-foreground">{task}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* Interview Questions */}
      <Card className="mb-6">
        <h2 className="text-2xl font-serif font-bold mb-6">10 Likely Interview Questions</h2>
        <div className="space-y-4">
          {questions.map((question, idx) => (
            <div key={idx} className="p-4 bg-background border border-border rounded-md">
              <p className="font-medium text-foreground">
                <span className="text-accent mr-2">{idx + 1}.</span>
                {question}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-4">
        <Button onClick={() => navigate('/dashboard/analyze')}>
          Analyze Another JD
        </Button>
        <Button variant="secondary" onClick={() => navigate('/dashboard/history')}>
          View All History
        </Button>
      </div>
    </div>
  );
};
