import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { getHistory, deleteAnalysis, AnalysisHistory } from '../utils/historyStorage';
import { Trash2, Eye } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<AnalysisHistory[]>([]);

  const loadHistory = () => {
    setHistory(getHistory());
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this analysis?')) {
      deleteAnalysis(id);
      loadHistory();
    }
  };

  const handleView = (id: string) => {
    navigate(`/dashboard/results/${id}`);
  };

  if (history.length === 0) {
    return (
      <div>
        <h1 className="text-4xl font-serif font-bold mb-10">Analysis History</h1>
        <Card className="text-center py-16">
          <p className="text-gray-600 mb-6">No analysis history yet.</p>
          <Button onClick={() => navigate('/dashboard/analyze')}>
            Analyze Your First JD
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-serif font-bold">Analysis History</h1>
        <Button onClick={() => navigate('/dashboard/analyze')}>
          New Analysis
        </Button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <Card
            key={item.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleView(item.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-xl font-serif font-semibold text-foreground">
                    {item.company}
                  </h3>
                  <span className="px-4 py-1 bg-accent text-white rounded-full text-sm font-medium">
                    Score: {item.readinessScore}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{item.role}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {Object.entries(item.extractedSkills).slice(0, 3).map(([category, skills]) => (
                    <span
                      key={category}
                      className="text-xs px-3 py-1 bg-background border border-border rounded-md"
                    >
                      {category}: {skills.length} skills
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()} at{' '}
                  {new Date(item.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="px-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleView(item.id);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  className="px-4 text-accent border-accent hover:bg-accent hover:text-white"
                  onClick={(e) => handleDelete(item.id, e)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
