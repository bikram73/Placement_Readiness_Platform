import { ExtractedSkills } from './skillExtractor';
import { CompanyIntel, RoundInfo } from './companyIntel';

export interface AnalysisHistory {
  id: string;
  createdAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: ExtractedSkills;
  plan: { [day: string]: string[] };
  checklist: { [round: string]: string[] };
  questions: string[];
  readinessScore: number;
  baseReadinessScore?: number; // Original score before adjustments
  skillConfidenceMap?: { [skill: string]: 'know' | 'practice' };
  companyIntel?: CompanyIntel;
  roundMapping?: RoundInfo[];
}

const STORAGE_KEY = 'placement_analysis_history';

export function saveAnalysis(analysis: Omit<AnalysisHistory, 'id' | 'createdAt'>): AnalysisHistory {
  const entry: AnalysisHistory = {
    ...analysis,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    baseReadinessScore: analysis.readinessScore,
    skillConfidenceMap: {}
  };

  const history = getHistory();
  history.unshift(entry); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  
  return entry;
}

export function updateAnalysis(id: string, updates: Partial<AnalysisHistory>): void {
  const history = getHistory();
  const index = history.findIndex(item => item.id === id);
  
  if (index !== -1) {
    history[index] = { ...history[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
}

export function getHistory(): AnalysisHistory[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
}

export function getAnalysisById(id: string): AnalysisHistory | null {
  const history = getHistory();
  return history.find(item => item.id === id) || null;
}

export function deleteAnalysis(id: string): void {
  const history = getHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
