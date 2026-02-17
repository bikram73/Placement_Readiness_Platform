import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Calendar, Clock, Award, TrendingUp, CheckCircle } from 'lucide-react';

interface Assessment {
  id: number;
  title: string;
  type: 'Mock Test' | 'Quiz' | 'Challenge';
  duration: string;
  questions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  scheduledDate?: string;
  status: 'upcoming' | 'completed' | 'available';
  score?: number;
  topics: string[];
}

const assessments: Assessment[] = [
  {
    id: 1,
    title: 'DSA Mock Test',
    type: 'Mock Test',
    duration: '90 min',
    questions: 20,
    difficulty: 'Medium',
    scheduledDate: 'Tomorrow, 10:00 AM',
    status: 'upcoming',
    topics: ['Arrays', 'Trees', 'Dynamic Programming'],
  },
  {
    id: 2,
    title: 'System Design Review',
    type: 'Mock Test',
    duration: '60 min',
    questions: 5,
    difficulty: 'Hard',
    scheduledDate: 'Wed, 2:00 PM',
    status: 'upcoming',
    topics: ['System Design', 'Scalability'],
  },
  {
    id: 3,
    title: 'Arrays & Strings Quiz',
    type: 'Quiz',
    duration: '30 min',
    questions: 15,
    difficulty: 'Easy',
    status: 'completed',
    score: 87,
    topics: ['Arrays', 'Strings'],
  },
  {
    id: 4,
    title: 'Weekly Coding Challenge',
    type: 'Challenge',
    duration: '45 min',
    questions: 10,
    difficulty: 'Medium',
    status: 'available',
    topics: ['Graphs', 'Trees'],
  },
  {
    id: 5,
    title: 'Dynamic Programming Deep Dive',
    type: 'Mock Test',
    duration: '120 min',
    questions: 25,
    difficulty: 'Hard',
    status: 'available',
    topics: ['Dynamic Programming'],
  },
  {
    id: 6,
    title: 'Linked Lists Mastery',
    type: 'Quiz',
    duration: '20 min',
    questions: 10,
    difficulty: 'Easy',
    status: 'completed',
    score: 95,
    topics: ['Linked Lists'],
  },
];

export const AssessmentsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'available'>('all');

  const filteredAssessments = assessments.filter(
    assessment => filter === 'all' || assessment.status === filter
  );

  const stats = {
    total: assessments.length,
    completed: assessments.filter(a => a.status === 'completed').length,
    upcoming: assessments.filter(a => a.status === 'upcoming').length,
    avgScore: Math.round(
      assessments
        .filter(a => a.score)
        .reduce((sum, a) => sum + (a.score || 0), 0) /
        assessments.filter(a => a.score).length
    ),
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Mock Test': return 'bg-blue-100 text-blue-800';
      case 'Quiz': return 'bg-purple-100 text-purple-800';
      case 'Challenge': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold mb-6">Assessments</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.upcoming}</p>
              <p className="text-sm text-gray-600">Upcoming</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.avgScore}%</p>
              <p className="text-sm text-gray-600">Avg Score</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Tests</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(['all', 'upcoming', 'available', 'completed'] as const).map(tab => (
          <Button
            key={tab}
            variant={filter === tab ? 'default' : 'secondary'}
            onClick={() => setFilter(tab)}
            size="sm"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAssessments.map(assessment => (
          <Card key={assessment.id}>
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {assessment.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getTypeColor(assessment.type)}>
                      {assessment.type}
                    </Badge>
                    <Badge className={getDifficultyColor(assessment.difficulty)}>
                      {assessment.difficulty}
                    </Badge>
                  </div>
                </div>
                {assessment.score && (
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">{assessment.score}%</p>
                    <p className="text-xs text-gray-600">Score</p>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-4 flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{assessment.duration}</span>
                  <span className="mx-2">•</span>
                  <span>{assessment.questions} questions</span>
                </div>

                {assessment.scheduledDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{assessment.scheduledDate}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {assessment.topics.map(topic => (
                    <Badge key={topic} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                variant={assessment.status === 'completed' ? 'secondary' : 'default'}
              >
                {assessment.status === 'upcoming' && 'View Details'}
                {assessment.status === 'completed' && 'Review Results'}
                {assessment.status === 'available' && 'Start Assessment'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
