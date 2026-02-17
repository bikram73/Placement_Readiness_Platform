import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Clock, CheckCircle, Circle, Lock } from 'lucide-react';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  completed: boolean;
  locked: boolean;
  timeEstimate: string;
}

const topics = [
  { name: 'All', count: 150 },
  { name: 'Arrays', count: 35 },
  { name: 'Strings', count: 28 },
  { name: 'Dynamic Programming', count: 25 },
  { name: 'Trees', count: 22 },
  { name: 'Graphs', count: 20 },
  { name: 'Linked Lists', count: 15 },
  { name: 'Sorting', count: 12 },
];

const problems: Problem[] = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', completed: true, locked: false, timeEstimate: '15 min' },
  { id: 2, title: 'Reverse String', difficulty: 'Easy', category: 'Strings', completed: true, locked: false, timeEstimate: '10 min' },
  { id: 3, title: 'Valid Parentheses', difficulty: 'Easy', category: 'Strings', completed: true, locked: false, timeEstimate: '20 min' },
  { id: 4, title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked Lists', completed: false, locked: false, timeEstimate: '25 min' },
  { id: 5, title: 'Maximum Subarray', difficulty: 'Medium', category: 'Arrays', completed: false, locked: false, timeEstimate: '30 min' },
  { id: 6, title: 'Longest Palindromic Substring', difficulty: 'Medium', category: 'Strings', completed: false, locked: false, timeEstimate: '35 min' },
  { id: 7, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', category: 'Trees', completed: false, locked: false, timeEstimate: '30 min' },
  { id: 8, title: 'Course Schedule', difficulty: 'Medium', category: 'Graphs', completed: false, locked: false, timeEstimate: '40 min' },
  { id: 9, title: 'Word Break', difficulty: 'Medium', category: 'Dynamic Programming', completed: false, locked: false, timeEstimate: '35 min' },
  { id: 10, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', category: 'Arrays', completed: false, locked: true, timeEstimate: '45 min' },
];

export const PracticePage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const filteredProblems = problems.filter(problem => {
    const topicMatch = selectedTopic === 'All' || problem.category === selectedTopic;
    const difficultyMatch = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    return topicMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: problems.length,
    completed: problems.filter(p => p.completed).length,
    easy: problems.filter(p => p.difficulty === 'Easy').length,
    medium: problems.filter(p => p.difficulty === 'Medium').length,
    hard: problems.filter(p => p.difficulty === 'Hard').length,
  };

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold mb-6">Practice Problems</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent">{stats.completed}/{stats.total}</p>
            <p className="text-sm text-gray-600 mt-1">Problems Solved</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{stats.easy}</p>
            <p className="text-sm text-gray-600 mt-1">Easy</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">{stats.medium}</p>
            <p className="text-sm text-gray-600 mt-1">Medium</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">{stats.hard}</p>
            <p className="text-sm text-gray-600 mt-1">Hard</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Topics Sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <h3 className="text-lg font-semibold mb-4">Topics</h3>
          <div className="space-y-2">
            {topics.map(topic => (
              <button
                key={topic.name}
                onClick={() => setSelectedTopic(topic.name)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors flex justify-between items-center ${
                  selectedTopic === topic.name
                    ? 'bg-accent text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-sm">{topic.name}</span>
                <span className="text-xs">{topic.count}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Difficulty</h3>
            <div className="space-y-2">
              {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                    selectedDifficulty === diff
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Problems List */}
        <div className="lg:col-span-3">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {selectedTopic === 'All' ? 'All Problems' : selectedTopic}
              </h3>
              <p className="text-sm text-gray-600">{filteredProblems.length} problems</p>
            </div>

            <div className="space-y-3">
              {filteredProblems.map(problem => (
                <div
                  key={problem.id}
                  className={`p-4 border border-border rounded-lg hover:shadow-md transition-shadow ${
                    problem.locked ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        {problem.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : problem.locked ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-2">{problem.title}</h4>
                        <div className="flex flex-wrap gap-2 items-center">
                          <Badge className={getDifficultyColor(problem.difficulty)}>
                            {problem.difficulty}
                          </Badge>
                          <Badge variant="secondary">{problem.category}</Badge>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>{problem.timeEstimate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant={problem.completed ? 'secondary' : 'default'}
                      size="sm"
                      disabled={problem.locked}
                    >
                      {problem.locked ? 'Locked' : problem.completed ? 'Review' : 'Solve'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
