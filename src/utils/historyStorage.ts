import { ExtractedSkills } from './skillExtractor';

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
}

const STORAGE_KEY = 'placement_analysis_history';

export function saveAnalysis(analysis: Omit<AnalysisHistory, 'id' | 'createdAt'>): AnalysisHistory {
  const entry: AnalysisHistory = {
    ...analysis,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };

  const history = getHistory();
  history.unshift(entry); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  
  return entry;
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
