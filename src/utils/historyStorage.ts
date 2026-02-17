import { ExtractedSkills } from './skillExtractor';
import { CompanyIntel, RoundInfo } from './companyIntel';

export interface AnalysisHistory {
  id: string;
  createdAt: string;
  updatedAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: ExtractedSkills;
  plan: { [day: string]: string[] };
  checklist: { [round: string]: string[] };
  questions: string[];
  baseScore: number; // Original score, never changes
  finalScore: number; // Current score after adjustments
  skillConfidenceMap: { [skill: string]: 'know' | 'practice' };
  companyIntel?: CompanyIntel;
  roundMapping?: RoundInfo[];
}

const STORAGE_KEY = 'placement_analysis_history';

export function saveAnalysis(data: {
  company: string;
  role: string;
  jdText: string;
  extractedSkills: ExtractedSkills;
  plan: { [day: string]: string[] };
  checklist: { [round: string]: string[] };
  questions: string[];
  readinessScore: number;
  companyIntel?: CompanyIntel;
  roundMapping?: RoundInfo[];
}): AnalysisHistory {
  const now = new Date().toISOString();
  const entry: AnalysisHistory = {
    id: Date.now().toString(),
    createdAt: now,
    updatedAt: now,
    company: data.company || '',
    role: data.role || '',
    jdText: data.jdText,
    extractedSkills: data.extractedSkills,
    plan: data.plan,
    checklist: data.checklist,
    questions: data.questions,
    baseScore: data.readinessScore,
    finalScore: data.readinessScore,
    skillConfidenceMap: {},
    companyIntel: data.companyIntel,
    roundMapping: data.roundMapping
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
    history[index] = { 
      ...history[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
}

export function getHistory(): AnalysisHistory[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    
    // Validate and filter corrupted entries
    const validated = parsed.filter((entry: any) => {
      try {
        return (
          entry.id &&
          entry.createdAt &&
          entry.jdText &&
          typeof entry.jdText === 'string' &&
          entry.extractedSkills &&
          typeof entry.extractedSkills === 'object'
        );
      } catch {
        return false;
      }
    });

    // Migrate old entries to new schema
    return validated.map((entry: any) => ({
      ...entry,
      updatedAt: entry.updatedAt || entry.createdAt,
      baseScore: entry.baseScore ?? entry.readinessScore ?? 35,
      finalScore: entry.finalScore ?? entry.readinessScore ?? 35,
      skillConfidenceMap: entry.skillConfidenceMap || {},
      company: entry.company || '',
      role: entry.role || ''
    }));
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
