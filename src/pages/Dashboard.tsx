import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, Clock } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

// Circular Progress Component
const CircularProgress: React.FC<{ value: number; max: number }> = ({ value, max }) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="transform -rotate-90 w-48 h-48">
        <circle
          cx="96"
          cy="96"
          r="70"
          stroke="#E0E0E0"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="96"
          cy="96"
          r="70"
          stroke="#8B0000"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-serif font-bold text-foreground">{value}</span>
        <span className="text-sm text-gray-600">/ {max}</span>
      </div>
    </div>
  );
};

export const DashboardHome: React.FC = () => {
  const navigate = useNavigate();

  // Skill breakdown data for radar chart
  const skillData = [
    { subject: 'DSA', score: 75, fullMark: 100 },
    { subject: 'System Design', score: 60, fullMark: 100 },
    { subject: 'Communication', score: 80, fullMark: 100 },
    { subject: 'Resume', score: 85, fullMark: 100 },
    { subject: 'Aptitude', score: 70, fullMark: 100 },
  ];

  // Weekly activity data
  const weekDays = [
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: false },
    { day: 'Thu', active: true },
    { day: 'Fri', active: true },
    { day: 'Sat', active: false },
    { day: 'Sun', active: false },
  ];

  // Upcoming assessments
  const assessments = [
    { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
    { title: 'System Design Review', time: 'Wed, 2:00 PM' },
    { title: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
  ];

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold mb-10">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Readiness */}
        <Card>
          <h3 className="text-xl font-serif font-semibold mb-6">Overall Readiness</h3>
          <CircularProgress value={72} max={100} />
          <p className="text-center mt-4 text-gray-600 font-medium">Readiness Score</p>
        </Card>

        {/* Skill Breakdown */}
        <Card>
          <h3 className="text-xl font-serif font-semibold mb-6">Skill Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={skillData}>
              <PolarGrid stroke="#E0E0E0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#111111', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#666666', fontSize: 10 }} />
              <Radar
                name="Skills"
                dataKey="score"
                stroke="#8B0000"
                fill="#8B0000"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Continue Practice */}
        <Card>
          <h3 className="text-xl font-serif font-semibold mb-6">Continue Practice</h3>
          <div className="mb-4">
            <p className="text-lg font-medium text-foreground mb-2">Dynamic Programming</p>
            <p className="text-sm text-gray-600 mb-4">3 of 10 completed</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div className="bg-accent h-2 rounded-full transition-all duration-300" style={{ width: '30%' }}></div>
            </div>
            <Button 
              className="w-full"
              onClick={() => navigate('/dashboard/practice')}
            >
              Continue
            </Button>
          </div>
        </Card>

        {/* Weekly Goals */}
        <Card>
          <h3 className="text-xl font-serif font-semibold mb-6">Weekly Goals</h3>
          <div className="mb-4">
            <p className="text-sm font-medium text-foreground mb-2">Problems Solved: 12/20 this week</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div className="bg-success h-2 rounded-full transition-all duration-300" style={{ width: '60%' }}></div>
            </div>
            <div className="flex justify-between gap-2">
              {weekDays.map((day) => (
                <div key={day.day} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                      day.active
                        ? 'bg-accent text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {day.day.charAt(0)}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Upcoming Assessments */}
        <Card className="lg:col-span-2">
          <h3 className="text-xl font-serif font-semibold mb-6">Upcoming Assessments</h3>
          <div className="space-y-4">
            {assessments.map((assessment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-border rounded-md hover:bg-background transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{assessment.title}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>{assessment.time}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  className="text-sm"
                  onClick={() => navigate('/dashboard/assessments')}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div>
      <h1 className="text-4xl font-serif font-bold mb-6">{title}</h1>
      <Card>
        <p className="text-gray-600">This page is under construction.</p>
      </Card>
    </div>
  );
};
