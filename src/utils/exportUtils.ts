import { AnalysisHistory } from './historyStorage';

export function export7DayPlan(plan: { [day: string]: string[] }): string {
  let text = '7-DAY PREPARATION PLAN\n';
  text += '='.repeat(50) + '\n\n';

  Object.entries(plan).forEach(([day, tasks]) => {
    text += `${day}\n`;
    text += '-'.repeat(day.length) + '\n';
    tasks.forEach((task, idx) => {
      text += `${idx + 1}. ${task}\n`;
    });
    text += '\n';
  });

  return text;
}

export function exportChecklist(checklist: { [round: string]: string[] }): string {
  let text = 'ROUND-WISE PREPARATION CHECKLIST\n';
  text += '='.repeat(50) + '\n\n';

  Object.entries(checklist).forEach(([round, items]) => {
    text += `${round}\n`;
    text += '-'.repeat(round.length) + '\n';
    items.forEach((item) => {
      text += `☐ ${item}\n`;
    });
    text += '\n';
  });

  return text;
}

export function exportQuestions(questions: string[]): string {
  let text = '10 LIKELY INTERVIEW QUESTIONS\n';
  text += '='.repeat(50) + '\n\n';

  questions.forEach((question, idx) => {
    text += `${idx + 1}. ${question}\n\n`;
  });

  return text;
}

export function exportFullAnalysis(analysis: AnalysisHistory): string {
  let text = 'PLACEMENT READINESS ANALYSIS\n';
  text += '='.repeat(50) + '\n\n';

  text += `Company: ${analysis.company}\n`;
  text += `Role: ${analysis.role}\n`;
  text += `Analyzed: ${new Date(analysis.createdAt).toLocaleString()}\n`;
  text += `Readiness Score: ${analysis.readinessScore}/100\n\n`;

  text += '='.repeat(50) + '\n\n';

  // Skills
  text += 'KEY SKILLS EXTRACTED\n';
  text += '-'.repeat(50) + '\n';
  Object.entries(analysis.extractedSkills).forEach(([category, skills]) => {
    text += `\n${category}:\n`;
    skills.forEach(skill => {
      const confidence = analysis.skillConfidenceMap?.[skill];
      const status = confidence === 'know' ? '✓ I know this' : '○ Need practice';
      text += `  • ${skill} [${status}]\n`;
    });
  });
  text += '\n' + '='.repeat(50) + '\n\n';

  // Checklist
  text += exportChecklist(analysis.checklist);
  text += '='.repeat(50) + '\n\n';

  // 7-Day Plan
  text += export7DayPlan(analysis.plan);
  text += '='.repeat(50) + '\n\n';

  // Questions
  text += exportQuestions(analysis.questions);

  return text;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function downloadAsFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
