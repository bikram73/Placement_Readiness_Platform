import { ExtractedSkills } from './skillExtractor';

export type CompanySize = 'Startup' | 'Mid-size' | 'Enterprise';

export interface CompanyIntel {
  name: string;
  industry: string;
  size: CompanySize;
  hiringFocus: string;
}

export interface RoundInfo {
  round: string;
  description: string;
  whyMatters: string;
}

// Known enterprise companies
const ENTERPRISE_COMPANIES = [
  'google', 'microsoft', 'amazon', 'meta', 'facebook', 'apple', 'netflix',
  'infosys', 'tcs', 'wipro', 'cognizant', 'accenture', 'capgemini',
  'ibm', 'oracle', 'salesforce', 'adobe', 'intel', 'nvidia',
  'jpmorgan', 'goldman sachs', 'morgan stanley', 'deloitte', 'pwc',
  'walmart', 'target', 'uber', 'airbnb', 'linkedin', 'twitter', 'x corp'
];

// Known mid-size companies
const MIDSIZE_COMPANIES = [
  'zomato', 'swiggy', 'paytm', 'razorpay', 'cred', 'phonepe',
  'freshworks', 'zoho', 'postman', 'browserstack', 'clevertap',
  'atlassian', 'slack', 'notion', 'figma', 'canva'
];

export function inferCompanyIntel(companyName: string): CompanyIntel {
  const lowerName = companyName.toLowerCase();
  
  // Determine size
  let size: CompanySize = 'Startup';
  if (ENTERPRISE_COMPANIES.some(c => lowerName.includes(c))) {
    size = 'Enterprise';
  } else if (MIDSIZE_COMPANIES.some(c => lowerName.includes(c))) {
    size = 'Mid-size';
  }

  // Infer industry based on keywords
  let industry = 'Technology Services';
  if (lowerName.includes('bank') || lowerName.includes('finance') || lowerName.includes('capital')) {
    industry = 'Financial Services';
  } else if (lowerName.includes('health') || lowerName.includes('medical') || lowerName.includes('pharma')) {
    industry = 'Healthcare & Life Sciences';
  } else if (lowerName.includes('retail') || lowerName.includes('ecommerce') || lowerName.includes('shop')) {
    industry = 'Retail & E-commerce';
  } else if (lowerName.includes('consult')) {
    industry = 'Consulting Services';
  } else if (lowerName.includes('food') || lowerName.includes('delivery')) {
    industry = 'Food & Delivery Services';
  }

  // Hiring focus based on size
  let hiringFocus = '';
  if (size === 'Enterprise') {
    hiringFocus = 'Structured DSA fundamentals, core computer science concepts, system design basics, and behavioral assessment. Emphasis on problem-solving methodology and scalable thinking.';
  } else if (size === 'Mid-size') {
    hiringFocus = 'Balance of DSA fundamentals and practical tech stack knowledge. Focus on shipping features quickly while maintaining code quality. Cultural fit is important.';
  } else {
    hiringFocus = 'Practical problem-solving with real-world scenarios. Deep knowledge of tech stack, ability to wear multiple hats, and fast execution. Less emphasis on theoretical DSA.';
  }

  return {
    name: companyName,
    industry,
    size,
    hiringFocus
  };
}

export function generateRoundMapping(
  companySize: CompanySize,
  skills: ExtractedSkills
): RoundInfo[] {
  const hasDSA = skills['Core CS']?.some(s => 
    s.toLowerCase().includes('dsa') || 
    s.toLowerCase().includes('algorithm') ||
    s.toLowerCase().includes('data structures')
  );
  const hasWeb = !!skills['Web'];
  const hasReact = skills['Web']?.some(s => s.toLowerCase().includes('react'));
  const hasNode = skills['Web']?.some(s => s.toLowerCase().includes('node'));

  if (companySize === 'Enterprise') {
    return [
      {
        round: 'Round 1: Online Assessment',
        description: 'DSA problems (2-3 medium level) + Aptitude + MCQs on core CS',
        whyMatters: 'Filters candidates at scale. Tests fundamental problem-solving and CS knowledge. Usually time-bound (60-90 mins).'
      },
      {
        round: 'Round 2: Technical Interview - DSA',
        description: hasDSA 
          ? 'Live coding: Arrays, strings, trees, graphs. Explain approach, optimize, handle edge cases.'
          : 'Problem-solving with data structures. Focus on logic and optimization.',
        whyMatters: 'Evaluates coding ability under pressure, communication skills, and depth of algorithmic thinking.'
      },
      {
        round: 'Round 3: Technical Interview - Projects & Stack',
        description: hasWeb
          ? `Deep dive into your projects. Expect questions on ${hasReact ? 'React architecture' : 'web technologies'}, system design basics, and trade-offs.`
          : 'Project discussion, architecture decisions, and technical depth in your stack.',
        whyMatters: 'Assesses real-world experience, ability to build production systems, and technical decision-making.'
      },
      {
        round: 'Round 4: HR & Behavioral',
        description: 'Tell me about yourself, strengths/weaknesses, conflict resolution, salary expectations.',
        whyMatters: 'Evaluates cultural fit, communication skills, career goals alignment, and negotiation readiness.'
      }
    ];
  } else if (companySize === 'Mid-size') {
    return [
      {
        round: 'Round 1: Technical Screening',
        description: hasDSA
          ? 'Mix of DSA (1-2 easy-medium) + practical coding in your stack'
          : 'Practical coding problems relevant to the role',
        whyMatters: 'Quick filter to assess baseline technical competency and coding fluency.'
      },
      {
        round: 'Round 2: Technical Deep Dive',
        description: hasWeb
          ? `${hasReact ? 'React' : 'Frontend'} concepts, ${hasNode ? 'Node.js/backend' : 'API'} design, database queries, and project walkthrough.`
          : 'Deep technical discussion on your projects and tech stack expertise.',
        whyMatters: 'Tests depth of knowledge in relevant technologies and ability to ship features independently.'
      },
      {
        round: 'Round 3: System Design / Problem Solving',
        description: 'Design a feature or system (e.g., notification service, URL shortener). Discuss trade-offs.',
        whyMatters: 'Evaluates architectural thinking, scalability awareness, and ability to handle ambiguity.'
      },
      {
        round: 'Round 4: Culture Fit & Founder Round',
        description: 'Discussion with senior leadership about vision, work style, and mutual expectations.',
        whyMatters: 'Ensures alignment with company values, growth mindset, and long-term potential.'
      }
    ];
  } else {
    // Startup
    return [
      {
        round: 'Round 1: Practical Coding Challenge',
        description: hasWeb
          ? `Build a small feature or fix bugs in ${hasReact ? 'React' : 'frontend'} code. Focus on working solution.`
          : 'Solve a real-world problem with working code. Less theory, more execution.',
        whyMatters: 'Startups need people who can ship fast. This tests your ability to deliver working code quickly.'
      },
      {
        round: 'Round 2: Technical Discussion',
        description: hasWeb
          ? `Discuss your projects, ${hasReact ? 'React patterns' : 'web architecture'}, and how you\'d approach building features.`
          : 'Walk through your experience, technical decisions, and problem-solving approach.',
        whyMatters: 'Assesses depth of understanding and ability to make pragmatic technical choices under constraints.'
      },
      {
        round: 'Round 3: Culture & Vision Fit',
        description: 'Meet the team/founders. Discuss startup life, ownership mindset, and growth trajectory.',
        whyMatters: 'Startups need versatile team players who thrive in ambiguity and take ownership. Cultural fit is critical.'
      }
    ];
  }
}
