import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
  extractSkills,
  generateChecklist,
  generate7DayPlan,
  generateInterviewQuestions,
  calculateReadinessScore
} from '../utils/skillExtractor';
import { saveAnalysis } from '../utils/historyStorage';

export const AnalyzePage: React.FC = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!jdText.trim()) {
      alert('Please enter a job description');
      return;
    }

    setIsAnalyzing(true);

    // Simulate processing time for better UX
    setTimeout(() => {
      // Extract skills and generate analysis
      const extractedSkills = extractSkills(jdText);
      const checklist = generateChecklist(extractedSkills);
      const plan = generate7DayPlan(extractedSkills);
      const questions = generateInterviewQuestions(extractedSkills);
      const readinessScore = calculateReadinessScore(
        extractedSkills,
        company,
        role,
        jdText.length
      );

      // Save to history
      const analysis = saveAnalysis({
        company: company || 'Unknown Company',
        role: role || 'Unknown Role',
        jdText,
        extractedSkills,
        plan,
        checklist,
        questions,
        readinessScore
      });

      setIsAnalyzing(false);

      // Navigate to results with the analysis ID
      navigate(`/dashboard/results/${analysis.id}`);
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold mb-4">Analyze Job Description</h1>
      <p className="text-gray-600 mb-10 max-w-reading">
        Paste a job description to get personalized preparation insights, skill analysis, and interview questions.
      </p>

      <div className="max-w-4xl">
        <Card className="mb-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company Name (Optional)
              </label>
              <Input
                type="text"
                placeholder="e.g., Google, Microsoft, Amazon"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Role (Optional)
              </label>
              <Input
                type="text"
                placeholder="e.g., Software Engineer, Frontend Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Description <span className="text-accent">*</span>
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-4 py-4 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors bg-white min-h-[300px] font-sans"
                placeholder="Paste the complete job description here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-2">
                {jdText.length} characters {jdText.length > 800 && '✓ Detailed JD (+10 score)'}
              </p>
            </div>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !jdText.trim()}
            className="px-10"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze JD'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/dashboard/history')}
          >
            View History
          </Button>
        </div>
      </div>
    </div>
  );
};
