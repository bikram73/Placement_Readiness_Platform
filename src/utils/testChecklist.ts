export interface TestItem {
  id: string;
  label: string;
  hint: string;
  checked: boolean;
}

const CHECKLIST_KEY = 'prp_test_checklist';

export const DEFAULT_TESTS: TestItem[] = [
  {
    id: 'jd-validation',
    label: 'JD required validation works',
    hint: 'Go to /dashboard/analyze, leave JD empty, click Analyze. Should show error.',
    checked: false
  },
  {
    id: 'short-jd-warning',
    label: 'Short JD warning shows for <200 chars',
    hint: 'Enter less than 200 characters in JD field. Should show warning message.',
    checked: false
  },
  {
    id: 'skills-extraction',
    label: 'Skills extraction groups correctly',
    hint: 'Analyze JD with "React, Node.js, SQL". Should group under Web and Data categories.',
    checked: false
  },
  {
    id: 'round-mapping',
    label: 'Round mapping changes based on company + skills',
    hint: 'Test with "Amazon" (Enterprise) vs unknown company (Startup). Rounds should differ.',
    checked: false
  },
  {
    id: 'score-calculation',
    label: 'Score calculation is deterministic',
    hint: 'Same JD + company + role should always produce same base score.',
    checked: false
  },
  {
    id: 'skill-toggles',
    label: 'Skill toggles update score live',
    hint: 'On results page, toggle skills. Score should update immediately without refresh.',
    checked: false
  },
  {
    id: 'persist-refresh',
    label: 'Changes persist after refresh',
    hint: 'Toggle skills, refresh page. Toggles should remain in same state.',
    checked: false
  },
  {
    id: 'history-saves',
    label: 'History saves and loads correctly',
    hint: 'Analyze JD, go to history, click entry. Should load full saved analysis.',
    checked: false
  },
  {
    id: 'export-buttons',
    label: 'Export buttons copy the correct content',
    hint: 'Click "Copy 7-Day Plan" and paste. Should contain formatted plan text.',
    checked: false
  },
  {
    id: 'no-console-errors',
    label: 'No console errors on core pages',
    hint: 'Open DevTools console, navigate through app. Should have no errors.',
    checked: false
  }
];

export function getChecklist(): TestItem[] {
  try {
    const stored = localStorage.getItem(CHECKLIST_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle new tests
      return DEFAULT_TESTS.map(defaultTest => {
        const savedTest = parsed.find((t: TestItem) => t.id === defaultTest.id);
        return savedTest ? { ...defaultTest, checked: savedTest.checked } : defaultTest;
      });
    }
    return DEFAULT_TESTS;
  } catch (error) {
    console.error('Error loading checklist:', error);
    return DEFAULT_TESTS;
  }
}

export function saveChecklist(checklist: TestItem[]): void {
  try {
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist));
  } catch (error) {
    console.error('Error saving checklist:', error);
  }
}

export function toggleTest(testId: string): TestItem[] {
  const checklist = getChecklist();
  const updated = checklist.map(test =>
    test.id === testId ? { ...test, checked: !test.checked } : test
  );
  saveChecklist(updated);
  return updated;
}

export function resetChecklist(): TestItem[] {
  const reset = DEFAULT_TESTS.map(test => ({ ...test, checked: false }));
  saveChecklist(reset);
  return reset;
}

export function getPassedCount(): number {
  const checklist = getChecklist();
  return checklist.filter(test => test.checked).length;
}

export function isAllTestsPassed(): boolean {
  return getPassedCount() === DEFAULT_TESTS.length;
}
