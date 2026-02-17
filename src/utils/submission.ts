export interface FinalSubmission {
  lovableLink: string;
  githubLink: string;
  deployedUrl: string;
  submittedAt?: string;
}

export interface StepStatus {
  id: number;
  name: string;
  completed: boolean;
}

const SUBMISSION_KEY = 'prp_final_submission';
const STEPS_KEY = 'prp_steps_status';

export const DEFAULT_STEPS: StepStatus[] = [
  { id: 1, name: 'Design System Created', completed: false },
  { id: 2, name: 'Landing Page Built', completed: false },
  { id: 3, name: 'Dashboard Implemented', completed: false },
  { id: 4, name: 'Analysis Engine Working', completed: false },
  { id: 5, name: 'Interactive Features Added', completed: false },
  { id: 6, name: 'Company Intel Integrated', completed: false },
  { id: 7, name: 'Validation & Edge Cases', completed: false },
  { id: 8, name: 'Testing Complete', completed: false }
];

export function getSubmission(): FinalSubmission {
  try {
    const stored = localStorage.getItem(SUBMISSION_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      lovableLink: '',
      githubLink: '',
      deployedUrl: ''
    };
  } catch (error) {
    console.error('Error loading submission:', error);
    return {
      lovableLink: '',
      githubLink: '',
      deployedUrl: ''
    };
  }
}

export function saveSubmission(submission: FinalSubmission): void {
  try {
    localStorage.setItem(SUBMISSION_KEY, JSON.stringify(submission));
  } catch (error) {
    console.error('Error saving submission:', error);
  }
}

export function getSteps(): StepStatus[] {
  try {
    const stored = localStorage.getItem(STEPS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return DEFAULT_STEPS.map(defaultStep => {
        const savedStep = parsed.find((s: StepStatus) => s.id === defaultStep.id);
        return savedStep ? { ...defaultStep, completed: savedStep.completed } : defaultStep;
      });
    }
    return DEFAULT_STEPS;
  } catch (error) {
    console.error('Error loading steps:', error);
    return DEFAULT_STEPS;
  }
}

export function saveSteps(steps: StepStatus[]): void {
  try {
    localStorage.setItem(STEPS_KEY, JSON.stringify(steps));
  } catch (error) {
    console.error('Error saving steps:', error);
  }
}

export function toggleStep(stepId: number): StepStatus[] {
  const steps = getSteps();
  const updated = steps.map(step =>
    step.id === stepId ? { ...step, completed: !step.completed } : step
  );
  saveSteps(updated);
  return updated;
}

export function isValidUrl(url: string): boolean {
  if (!url || url.trim().length === 0) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

export function areAllLinksProvided(submission: FinalSubmission): boolean {
  return (
    isValidUrl(submission.lovableLink) &&
    isValidUrl(submission.githubLink) &&
    isValidUrl(submission.deployedUrl)
  );
}

export function getCompletedStepsCount(): number {
  const steps = getSteps();
  return steps.filter(step => step.completed).length;
}

export function areAllStepsCompleted(): boolean {
  return getCompletedStepsCount() === DEFAULT_STEPS.length;
}

export function generateSubmissionText(submission: FinalSubmission): string {
  return `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${submission.lovableLink || '[Not provided]'}
GitHub Repository: ${submission.githubLink || '[Not provided]'}
Live Deployment: ${submission.deployedUrl || '[Not provided]'}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence

Built with: React, TypeScript, Tailwind CSS, React Router
------------------------------------------`;
}
