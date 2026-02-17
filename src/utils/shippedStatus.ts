import { isAllTestsPassed } from './testChecklist';
import { areAllStepsCompleted, areAllLinksProvided, getSubmission } from './submission';

export type ProjectStatus = 'Not Started' | 'In Progress' | 'Shipped';

export function getProjectStatus(): ProjectStatus {
  const allTestsPassed = isAllTestsPassed();
  const allStepsCompleted = areAllStepsCompleted();
  const submission = getSubmission();
  const allLinksProvided = areAllLinksProvided(submission);

  // Shipped only if ALL conditions met
  if (allTestsPassed && allStepsCompleted && allLinksProvided) {
    return 'Shipped';
  }

  // In Progress if any work has been done
  const hasAnyProgress = 
    allTestsPassed || 
    allStepsCompleted || 
    submission.lovableLink || 
    submission.githubLink || 
    submission.deployedUrl;

  return hasAnyProgress ? 'In Progress' : 'Not Started';
}

export function getStatusColor(status: ProjectStatus): string {
  switch (status) {
    case 'Shipped':
      return 'bg-success text-white';
    case 'In Progress':
      return 'bg-warning text-white';
    case 'Not Started':
      return 'bg-gray-400 text-white';
    default:
      return 'bg-gray-400 text-white';
  }
}

export function getShippedRequirements(): {
  label: string;
  met: boolean;
}[] {
  const allTestsPassed = isAllTestsPassed();
  const allStepsCompleted = areAllStepsCompleted();
  const submission = getSubmission();
  const allLinksProvided = areAllLinksProvided(submission);

  return [
    { label: 'All 8 steps completed', met: allStepsCompleted },
    { label: 'All 10 checklist items passed', met: allTestsPassed },
    { label: 'All 3 proof links provided', met: allLinksProvided }
  ];
}
