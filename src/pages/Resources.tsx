import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BookOpen, Video, FileText, ExternalLink, Search, Star } from 'lucide-react';
import { Input } from '../components/ui/Input';

interface Resource {
  id: number;
  title: string;
  type: 'Article' | 'Video' | 'Book' | 'Tutorial';
  category: string;
  description: string;
  duration?: string;
  rating: number;
  url: string;
  featured?: boolean;
}

const resources: Resource[] = [
  {
    id: 1,
    title: 'Introduction to Data Structures',
    type: 'Video',
    category: 'DSA',
    description: 'Comprehensive guide covering arrays, linked lists, stacks, and queues.',
    duration: '45 min',
    rating: 4.8,
    url: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'System Design Interview Guide',
    type: 'Book',
    category: 'System Design',
    description: 'Complete handbook for acing system design interviews at top tech companies.',
    rating: 4.9,
    url: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Dynamic Programming Patterns',
    type: 'Article',
    category: 'DSA',
    description: 'Master the most common DP patterns with detailed explanations and examples.',
    duration: '20 min read',
    rating: 4.7,
    url: '#',
  },
  {
    id: 4,
    title: 'Behavioral Interview Masterclass',
    type: 'Video',
    category: 'Interview Skills',
    description: 'Learn how to answer behavioral questions using the STAR method.',
    duration: '60 min',
    rating: 4.6,
    url: '#',
  },
  {
    id: 5,
    title: 'Graph Algorithms Explained',
    type: 'Tutorial',
    category: 'DSA',
    description: 'Step-by-step tutorials on BFS, DFS, Dijkstra, and more.',
    duration: '90 min',
    rating: 4.8,
    url: '#',
  },
  {
    id: 6,
    title: 'Resume Writing for Tech Jobs',
    type: 'Article',
    category: 'Career',
    description: 'Craft a compelling resume that gets you interviews at top companies.',
    duration: '15 min read',
    rating: 4.5,
    url: '#',
  },
  {
    id: 7,
    title: 'SQL Interview Questions',
    type: 'Tutorial',
    category: 'Database',
    description: 'Practice the most commonly asked SQL questions in technical interviews.',
    duration: '40 min',
    rating: 4.7,
    url: '#',
  },
  {
    id: 8,
    title: 'Object-Oriented Design Principles',
    type: 'Video',
    category: 'System Design',
    description: 'Deep dive into SOLID principles and design patterns.',
    duration: '75 min',
    rating: 4.9,
    url: '#',
    featured: true,
  },
];

const categories = ['All', 'DSA', 'System Design', 'Interview Skills', 'Career', 'Database'];

export const ResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource => {
    const categoryMatch = selectedCategory === 'All' || resource.category === selectedCategory;
    const searchMatch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const featuredResources = resources.filter(r => r.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video': return <Video className="w-5 h-5" />;
      case 'Article': return <FileText className="w-5 h-5" />;
      case 'Book': return <BookOpen className="w-5 h-5" />;
      case 'Tutorial': return <BookOpen className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Video': return 'bg-red-100 text-red-800';
      case 'Article': return 'bg-blue-100 text-blue-800';
      case 'Book': return 'bg-green-100 text-green-800';
      case 'Tutorial': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold mb-6">Learning Resources</h1>

      {/* Featured Resources */}
      {selectedCategory === 'All' && !searchQuery && (
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-4">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredResources.map(resource => (
              <Card key={resource.id} className="border-2 border-accent/20">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    {getTypeIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <Badge className={getTypeColor(resource.type)} size="sm">
                      {resource.type}
                    </Badge>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{resource.rating}</span>
                  </div>
                  {resource.duration && (
                    <span className="text-xs text-gray-500">{resource.duration}</span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredResources.map(resource => (
          <Card key={resource.id}>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                {getTypeIcon(resource.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{resource.title}</h3>
                  {resource.featured && (
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={getTypeColor(resource.type)} size="sm">
                    {resource.type}
                  </Badge>
                  <Badge variant="secondary" size="sm">
                    {resource.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{resource.rating}</span>
                    </div>
                    {resource.duration && <span>{resource.duration}</span>}
                  </div>
                  <Button size="sm" variant="secondary">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No resources found matching your criteria.</p>
          </div>
        </Card>
      )}
    </div>
  );
};
