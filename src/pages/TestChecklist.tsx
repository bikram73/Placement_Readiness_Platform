import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Circle, AlertTriangle, Info } from 'lucide-react';
import { getChecklist, toggleTest, resetChecklist, getPassedCount, TestItem } from '../utils/testChecklist';

export const TestChecklistPage: React.FC = () => {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<TestItem[]>([]);
  const [passedCount, setPassedCount] = useState(0);
  const [showHints, setShowHints] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    loadChecklist();
  }, []);

  const loadChecklist = () => {
    const items = getChecklist();
    setChecklist(items);
    setPassedCount(getPassedCount());
  };

  const handleToggle = (testId: string) => {
    const updated = toggleTest(testId);
    setChecklist(updated);
    setPassedCount(getPassedCount());
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all test checkboxes?')) {
      const reset = resetChecklist();
      setChecklist(reset);
      setPassedCount(0);
    }
  };

  const toggleHint = (testId: string) => {
    setShowHints(prev => ({
      ...prev,
      [testId]: !prev[testId]
    }));
  };

  const totalTests = checklist.length;
  const allPassed = passedCount === totalTests;

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold mb-4">Test Checklist</h1>
      <p className="text-gray-600 mb-10 max-w-reading">
        Complete all tests before shipping to ensure the platform works correctly.
      </p>

      {/* Summary Card */}
      <Card className={`mb-6 ${allPassed ? 'bg-success/10 border-success/30' : 'bg-warning/10 border-warning/30'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Test Progress</p>
            <p className="text-3xl font-serif font-bold text-foreground">
              {passedCount} / {totalTests}
            </p>
            <p className="text-sm text-gray-600 mt-1">Tests Passed</p>
          </div>
          {!allPassed && (
            <div className="flex items-center gap-2 text-warning">
              <AlertTriangle className="w-6 h-6" />
              <p className="text-sm font-medium">Fix issues before shipping.</p>
            </div>
          )}
          {allPassed && (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="w-6 h-6" />
              <p className="text-sm font-medium">All tests passed! Ready to ship.</p>
            </div>
          )}
        </div>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              allPassed ? 'bg-success' : 'bg-warning'
            }`}
            style={{ width: `${(passedCount / totalTests) * 100}%` }}
          ></div>
        </div>
      </Card>

      {/* Test Items */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold">Test Items</h2>
          <Button variant="secondary" onClick={handleReset} className="text-sm">
            Reset Checklist
          </Button>
        </div>
        <div className="space-y-4">
          {checklist.map((test, index) => (
            <div key={test.id} className="border border-border rounded-md p-4 hover:bg-background transition-colors">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => handleToggle(test.id)}
                  className="flex-shrink-0 mt-1"
                >
                  {test.checked ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`font-medium ${test.checked ? 'text-gray-500 line-through' : 'text-foreground'}`}>
                      {index + 1}. {test.label}
                    </p>
                    <button
                      onClick={() => toggleHint(test.id)}
                      className="text-gray-500 hover:text-accent transition-colors"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>
                  {showHints[test.id] && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <p className="text-xs font-medium text-gray-600 mb-1">How to test:</p>
                      <p className="text-sm text-gray-700">{test.hint}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={() => navigate('/prp/08-ship')}
          disabled={!allPassed}
          className={!allPassed ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {allPassed ? 'Proceed to Ship' : 'Complete Tests to Ship'}
        </Button>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};
