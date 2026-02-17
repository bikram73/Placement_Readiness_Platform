// Skill categories and keywords
export const SKILL_CATEGORIES = {
  'Core CS': ['dsa', 'data structures', 'algorithms', 'oop', 'object oriented', 'dbms', 'database', 'os', 'operating system', 'networks', 'networking', 'computer networks'],
  'Languages': ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'golang', 'go lang', 'ruby', 'php', 'swift', 'kotlin'],
  'Web': ['react', 'reactjs', 'next.js', 'nextjs', 'node.js', 'nodejs', 'express', 'rest', 'restful', 'api', 'graphql', 'angular', 'vue', 'html', 'css'],
  'Data': ['sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'nosql', 'database'],
  'Cloud/DevOps': ['aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'linux', 'devops'],
  'Testing': ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'testing', 'test automation', 'jest']
};

export interface ExtractedSkills {
  [category: string]: string[];
}

export function extractSkills(jdText: string): ExtractedSkills {
  const lowerText = jdText.toLowerCase();
  const extracted: ExtractedSkills = {};

  Object.entries(SKILL_CATEGORIES).forEach(([category, keywords]) => {
    const found = keywords.filter(keyword => lowerText.includes(keyword));
    if (found.length > 0) {
      // Remove duplicates and capitalize
      extracted[category] = [...new Set(found)].map(skill => 
        skill.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      );
    }
  });

  // If nothing found, add general stack
  if (Object.keys(extracted).length === 0) {
    extracted['General'] = ['Aptitude', 'Communication', 'Problem Solving'];
  }

  return extracted;
}

export function generateChecklist(skills: ExtractedSkills): { [round: string]: string[] } {
  const hasDS = skills['Core CS']?.some(s => s.toLowerCase().includes('dsa') || s.toLowerCase().includes('algorithm'));
  const hasWeb = !!skills['Web'];
  const hasCloud = !!skills['Cloud/DevOps'];
  const hasTesting = !!skills['Testing'];

  return {
    'Round 1: Aptitude & Basics': [
      'Complete quantitative aptitude practice (20+ problems)',
      'Review logical reasoning patterns',
      'Practice verbal ability and comprehension',
      'Solve previous year aptitude papers',
      'Time yourself on mock aptitude tests'
    ],
    'Round 2: DSA & Core CS': [
      hasDS ? 'Practice array and string problems (10+ each)' : 'Review basic data structures',
      hasDS ? 'Master sorting and searching algorithms' : 'Understand time complexity basics',
      'Revise OOP concepts with examples',
      'Study DBMS normalization and SQL queries',
      'Review OS concepts: processes, threads, memory',
      'Understand networking basics: TCP/IP, HTTP',
      hasDS ? 'Solve tree and graph problems' : 'Practice basic coding problems'
    ],
    'Round 3: Technical Interview': [
      'Prepare project explanations (architecture + challenges)',
      hasWeb ? 'Review React/frontend concepts and lifecycle' : 'Review your tech stack deeply',
      skills['Languages']?.length ? `Practice ${skills['Languages'][0]} coding questions` : 'Practice coding in your primary language',
      hasCloud ? 'Understand Docker and deployment basics' : 'Know how to deploy your projects',
      hasTesting ? 'Explain testing strategies you\'ve used' : 'Understand unit testing basics',
      'Prepare for system design basics (scalability, caching)',
      'Review your resume projects line by line',
      'Practice explaining technical decisions'
    ],
    'Round 4: HR & Managerial': [
      'Prepare "Tell me about yourself" (2-min version)',
      'List your strengths with examples',
      'Prepare weakness with improvement plan',
      'Research company culture and values',
      'Prepare questions to ask interviewer',
      'Practice STAR method for behavioral questions',
      'Prepare salary expectation discussion'
    ]
  };
}

export function generate7DayPlan(skills: ExtractedSkills): { [day: string]: string[] } {
  const hasDS = skills['Core CS']?.some(s => s.toLowerCase().includes('dsa'));
  const hasWeb = !!skills['Web'];
  const webTech = skills['Web']?.[0] || 'Web';

  return {
    'Day 1: Foundations': [
      'Review core CS fundamentals (OOP, DBMS, OS)',
      'Solve 5 easy coding problems',
      'Revise your strongest programming language',
      'Update resume with quantified achievements'
    ],
    'Day 2: Core Concepts': [
      'Deep dive into DBMS (normalization, indexing, transactions)',
      'Study OS concepts (scheduling, memory management)',
      'Practice 5 medium coding problems',
      'Review networking basics'
    ],
    'Day 3: DSA Practice': [
      hasDS ? 'Solve 10 array and string problems' : 'Practice basic data structure problems',
      hasDS ? 'Master binary search variations' : 'Learn searching and sorting',
      hasDS ? 'Practice linked list problems' : 'Understand linked lists basics',
      'Review time and space complexity'
    ],
    'Day 4: Advanced DSA': [
      hasDS ? 'Solve tree and graph problems (5 each)' : 'Practice recursion problems',
      hasDS ? 'Study dynamic programming basics' : 'Learn problem-solving patterns',
      'Practice stack and queue problems',
      'Solve previous company coding questions'
    ],
    'Day 5: Tech Stack & Projects': [
      hasWeb ? `Review ${webTech} concepts thoroughly` : 'Review your tech stack',
      'Prepare detailed project explanations',
      'Practice system design basics',
      skills['Cloud/DevOps'] ? 'Review Docker and CI/CD concepts' : 'Understand deployment basics',
      'Align resume with job requirements'
    ],
    'Day 6: Mock Interviews': [
      'Take a full mock technical interview',
      'Practice explaining projects out loud',
      'Solve 5 random medium problems under time pressure',
      'Record yourself answering common questions',
      'Review and improve communication'
    ],
    'Day 7: Final Revision': [
      'Revise weak areas identified in mocks',
      'Quick review of all core concepts',
      'Solve 3-5 problems for confidence',
      'Prepare questions to ask interviewer',
      'Get good sleep and stay confident'
    ]
  };
}

export function generateInterviewQuestions(skills: ExtractedSkills): string[] {
  const questions: string[] = [];

  // Core CS questions
  if (skills['Core CS']) {
    if (skills['Core CS'].some(s => s.toLowerCase().includes('dsa') || s.toLowerCase().includes('algorithm'))) {
      questions.push('Explain the difference between array and linked list. When would you use each?');
      questions.push('How would you optimize search in a sorted array? Explain binary search.');
      questions.push('What is the time complexity of common sorting algorithms?');
    }
    if (skills['Core CS'].some(s => s.toLowerCase().includes('oop'))) {
      questions.push('Explain the four pillars of OOP with real-world examples.');
    }
    if (skills['Core CS'].some(s => s.toLowerCase().includes('dbms') || s.toLowerCase().includes('database'))) {
      questions.push('Explain database indexing and when it helps performance.');
      questions.push('What is normalization? Explain with an example.');
    }
    if (skills['Core CS'].some(s => s.toLowerCase().includes('os'))) {
      questions.push('Explain the difference between process and thread.');
    }
  }

  // Web questions
  if (skills['Web']) {
    if (skills['Web'].some(s => s.toLowerCase().includes('react'))) {
      questions.push('Explain React state management options and when to use each.');
      questions.push('What are React hooks? Explain useState and useEffect.');
    }
    if (skills['Web'].some(s => s.toLowerCase().includes('node') || s.toLowerCase().includes('express'))) {
      questions.push('How does Node.js handle asynchronous operations?');
    }
    if (skills['Web'].some(s => s.toLowerCase().includes('rest') || s.toLowerCase().includes('api'))) {
      questions.push('Explain RESTful API design principles and best practices.');
    }
  }

  // Language questions
  if (skills['Languages']) {
    const lang = skills['Languages'][0].toLowerCase();
    if (lang.includes('java')) {
      questions.push('Explain Java memory management and garbage collection.');
    } else if (lang.includes('python')) {
      questions.push('What are Python decorators and generators? Provide examples.');
    } else if (lang.includes('javascript') || lang.includes('typescript')) {
      questions.push('Explain closures and promises in JavaScript.');
    }
  }

  // Cloud/DevOps questions
  if (skills['Cloud/DevOps']) {
    if (skills['Cloud/DevOps'].some(s => s.toLowerCase().includes('docker'))) {
      questions.push('What is Docker and how does containerization work?');
    }
    if (skills['Cloud/DevOps'].some(s => s.toLowerCase().includes('aws') || s.toLowerCase().includes('cloud'))) {
      questions.push('Explain the benefits of cloud computing and common services.');
    }
  }

  // Generic questions if not enough specific ones
  while (questions.length < 10) {
    const generic = [
      'Describe a challenging project you worked on and how you solved it.',
      'How do you approach debugging a complex issue?',
      'Explain a time when you had to learn a new technology quickly.',
      'How do you ensure code quality in your projects?',
      'What is your approach to writing clean, maintainable code?',
      'Explain how you would design a URL shortener service.',
      'How do you stay updated with new technologies?',
      'Describe your development workflow from idea to deployment.'
    ];
    const remaining = generic.filter(q => !questions.includes(q));
    if (remaining.length > 0) {
      questions.push(remaining[0]);
    } else {
      break;
    }
  }

  return questions.slice(0, 10);
}

export function calculateReadinessScore(
  skills: ExtractedSkills,
  company: string,
  role: string,
  jdLength: number
): number {
  let score = 35; // Base score

  // +5 per category (max 30)
  const categoryCount = Object.keys(skills).length;
  score += Math.min(categoryCount * 5, 30);

  // +10 if company provided
  if (company.trim().length > 0) {
    score += 10;
  }

  // +10 if role provided
  if (role.trim().length > 0) {
    score += 10;
  }

  // +10 if JD length > 800
  if (jdLength > 800) {
    score += 10;
  }

  return Math.min(score, 100);
}
