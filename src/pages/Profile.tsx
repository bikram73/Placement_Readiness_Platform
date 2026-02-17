import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Target, Edit2, Save } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    college: 'Stanford University',
    degree: 'B.Tech in Computer Science',
    graduationYear: '2024',
    targetRole: 'Software Engineer',
    targetCompanies: ['Google', 'Microsoft', 'Amazon', 'Meta'],
  });

  const skills = [
    { name: 'Data Structures', level: 85 },
    { name: 'Algorithms', level: 80 },
    { name: 'System Design', level: 70 },
    { name: 'Problem Solving', level: 90 },
    { name: 'Communication', level: 75 },
  ];

  const achievements = [
    { title: '100 Problems Solved', icon: Award, color: 'text-yellow-600' },
    { title: '10 Day Streak', icon: Target, color: 'text-green-600' },
    { title: '5 Mock Tests Completed', icon: Award, color: 'text-blue-600' },
    { title: 'Top 10% Performer', icon: Award, color: 'text-purple-600' },
  ];

  const stats = [
    { label: 'Problems Solved', value: '127' },
    { label: 'Mock Tests', value: '8' },
    { label: 'Study Hours', value: '45' },
    { label: 'Streak Days', value: '12' },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-serif font-bold">Profile</h1>
        <Button
          variant={isEditing ? 'default' : 'secondary'}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{profile.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{profile.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{profile.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    {isEditing ? (
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{profile.location}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Education */}
          <Card>
            <h2 className="text-xl font-serif font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1">College/University</label>
                {isEditing ? (
                  <Input
                    value={profile.college}
                    onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                  />
                ) : (
                  <p className="font-medium">{profile.college}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1">Degree</label>
                {isEditing ? (
                  <Input
                    value={profile.degree}
                    onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                  />
                ) : (
                  <p className="font-medium">{profile.degree}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1">Graduation Year</label>
                {isEditing ? (
                  <Input
                    value={profile.graduationYear}
                    onChange={(e) => setProfile({ ...profile, graduationYear: e.target.value })}
                  />
                ) : (
                  <p className="font-medium">{profile.graduationYear}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Career Goals */}
          <Card>
            <h2 className="text-xl font-serif font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Career Goals
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-1">Target Role</label>
                {isEditing ? (
                  <Input
                    value={profile.targetRole}
                    onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
                  />
                ) : (
                  <p className="font-medium">{profile.targetRole}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Target Companies</label>
                <div className="flex flex-wrap gap-2">
                  {profile.targetCompanies.map(company => (
                    <Badge key={company} variant="secondary">
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Skills Progress */}
          <Card>
            <h2 className="text-xl font-serif font-semibold mb-6">Skills Assessment</h2>
            <div className="space-y-4">
              {skills.map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Stats & Achievements */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <h2 className="text-xl font-serif font-semibold mb-4">Statistics</h2>
            <div className="space-y-4">
              {stats.map(stat => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{stat.label}</span>
                  <span className="text-2xl font-bold text-accent">{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card>
            <h2 className="text-xl font-serif font-semibold mb-4">Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${achievement.color}`}>
                    <achievement.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{achievement.title}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity Summary */}
          <Card>
            <h2 className="text-xl font-serif font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                <div>
                  <p className="font-medium">Completed DSA Mock Test</p>
                  <p className="text-gray-600 text-xs">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                <div>
                  <p className="font-medium">Solved 5 problems</p>
                  <p className="text-gray-600 text-xs">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5"></div>
                <div>
                  <p className="font-medium">Watched System Design video</p>
                  <p className="text-gray-600 text-xs">2 days ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
