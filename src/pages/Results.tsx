import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, CheckCircle2, Download, Copy, Check } from 'lucide-react';
import { getAnalysisById, updateAnalysis, AnalysisHistory } from '../utils/historyStorage';
import {
  export7DayPlan,
  exportChecklist,
  exportQuestions,
  exportFullAnalysis,
  copyToClipboard,
  downloadAsFile
} from '../utils/exportUtils';

export const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AnalysisHistory | null>(null);
  const [skillConfidence, setSkillConfidence] = useState<{ [skill: string]: 'know' | 'practice' }>({});
  const [liveScore, setLiveScore] = useState(0);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const data = getAnalysisById(id);
      if (data) {
        setAnalysis(data);
        setSkillConfidence(data.skillConfidenceMap || {});
        setLiveScore(data.readinessScore);
      } else {
        navigate('/dashboard/analyze');
      }
    }
  }, [id, navigate]);

  // Calculate live score based on skill confidence
  useEffect(() => {
    if (!analysis) return;

    const baseScore = analysis.baseReadinessScore || analysis.readinessScore;
    let adjustedScore = baseScore;

    // Get all skills as flat array
    const allSkills = Object.values(analysis.extractedSkills).flat();

    allSkills.forEach(skill => {
      const confidence = skillConfidence[skill] || 'practice';
      if (confidence === 'know') {
        adjustedScore += 2;
      } else {
        adjustedScore -= 2;
      }
    });

    // Bounds: 0-100
    const finalScore = Math.max(0, Math.min(100, adjustedScore));
    setLiveScore(finalScore);

    // Save to localStorage
    if (id) {
      updateAnalysis(id, {
        skillConfidenceMap: skillConfidence,
        readinessScore: finalScore
      });
    }
  }, [skillConfidence, analysis, id]);

  const toggleSkillConfidence = (skill: string) => {
    setSkillConfidence(prev => ({
      ...prev,
      [skill]: prev[skill] === 'know' ? 'practice' : 'know'
    }));
  };

  const handleCopy = async (content: string, itemName: string) => {
    try {
      await copyToClipboard(content);
      setCopiedItem(itemName);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    if (!analysis) return;
    const content = exportFullAnalysis({ ...analysis, readinessScore: liveScore, skillConfidenceMap: skillConfidence });
    const filename = `${analysis.company.replace(/\s+/g, '_')}_Analysis_${new Date().toISOString().split('T')[0]}.txt`;
    downloadAsFile(content, filename);
  };

  if (!analysis) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const { company, role, extractedSkills, checklist, plan, questions, createdAt, companyIntel, roundMapping } = analysis;

  // Get weak skills (marked as "practice")
  const allSkills = Object.values(extractedSkills).flat();
  const weakSkills = allSkills.filter(skill => (skillConfidence[skill] || 'practice') === 'practice').slice(0, 3);

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

      {/* Company Intel Block */}
      {companyIntel && (
        <Card className="mb-6 bg-blue-50/50 border-blue-200">
          <h2 className="text-2xl font-serif font-bold mb-4">Company Intel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Industry</p>
              <p className="text-lg font-medium text-foreground">{companyIntel.industry}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Company Size</p>
              <p className="text-lg font-medium text-foreground">{companyIntel.size}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Employees</p>
              <p className="text-sm text-gray-600">
                {companyIntel.size === 'Startup' && '<200'}
                {companyIntel.size === 'Mid-size' && '200-2000'}
                {companyIntel.size === 'Enterprise' && '2000+'}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Typical Hiring Focus</p>
            <p className="text-sm text-gray-700 leading-relaxed">{companyIntel.hiringFocus}</p>
          </div>
          <p className="text-xs text-gray-500 italic">
            Demo Mode: Company intel generated heuristically based on available data.
          </p>
        </Card>
      )}

      {/* Round Mapping Timeline */}
      {roundMapping && roundMapping.length > 0 && (
        <Card className="mb-6">
          <h2 className="text-2xl font-serif font-bold mb-6">Interview Round Flow</h2>
          <div className="space-y-6">
            {roundMapping.map((round, idx) => (
              <div key={idx} className="flex gap-4">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {idx + 1}
                  </div>
                  {idx < roundMapping.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2"></div>
                  )}
                </div>
                {/* Round content */}
                <div className="flex-1 pb-6">
                  <h3 className="text-lg font-serif font-semibold text-foreground mb-2">{round.round}</h3>
                  <p className="text-sm text-gray-700 mb-3">{round.description}</p>
                  <div className="p-3 bg-background rounded-md border-l-4 border-accent">
                    <p className="text-xs font-medium text-gray-600 mb-1">Why this round matters:</p>
                    <p className="text-sm text-gray-700">{round.whyMatters}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Live Readiness Score */}
      <Card className="mb-6 bg-accent/5 border-accent/20">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 mb-2">Overall Readiness Score (Live)</p>
          <p className="text-6xl font-serif font-bold text-accent mb-2">{liveScore}</p>
          <p className="text-sm text-gray-600">out of 100</p>
          <p className="text-xs text-gray-500 mt-4">
            Score updates based on your skill confidence selections
          </p>
        </div>
      </Card>

      {/* Interactive Skills */}
      <Card className="mb-6">
        <h2 className="text-2xl font-serif font-bold mb-4">Key Skills Extracted</h2>
        <p className="text-sm text-gray-600 mb-6">
          Toggle each skill to indicate your confidence level. This will update your readiness score in real-time.
        </p>
        <div className="space-y-4">
          {Object.entries(extractedSkills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => {
                  const confidence = skillConfidence[skill] || 'practice';
                  const isKnown = confidence === 'know';
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleSkillConfidence(skill)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                        isKnown
                          ? 'bg-success text-white border-success'
                          : 'bg-background border-border text-foreground hover:border-accent'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isKnown && <Check className="w-4 h-4" />}
                        {skill}
                        <span className="text-xs opacity-75">
                          {isKnown ? '(I know this)' : '(Need practice)'}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Export Tools */}
      <Card className="mb-6">
        <h2 className="text-2xl font-serif font-bold mb-4">Export Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="secondary"
            onClick={() => handleCopy(export7DayPlan(plan), '7-day-plan')}
            className="flex items-center gap-2"
          >
            {copiedItem === '7-day-plan' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy 7-Day Plan
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleCopy(exportChecklist(checklist), 'checklist')}
            className="flex items-center gap-2"
          >
            {copiedItem === 'checklist' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy Checklist
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleCopy(exportQuestions(questions), 'questions')}
            className="flex items-center gap-2"
          >
            {copiedItem === 'questions' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            Copy Questions
          </Button>
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download TXT
          </Button>
        </div>
      </Card>

      {/* Action Next Box */}
      {weakSkills.length > 0 && (
        <Card className="mb-6 bg-warning/10 border-warning/30">
          <h2 className="text-2xl font-serif font-bold mb-4">Action Next</h2>
          <div className="mb-4">
            <p className="text-sm font-medium text-foreground mb-2">Top skills to focus on:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {weakSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-background border border-warning rounded-md text-sm font-medium text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-white rounded-md border border-border">
            <p className="font-medium text-foreground mb-2">Recommended Next Step:</p>
            <p className="text-gray-600 mb-4">Start Day 1 plan now and focus on building strong fundamentals.</p>
            <Button onClick={() => window.scrollTo({ top: document.getElementById('day-plan')?.offsetTop || 0, behavior: 'smooth' })}>
              View Day 1 Plan
            </Button>
          </div>
        </Card>
      )}

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
      <Card className="mb-6" id="day-plan">
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
