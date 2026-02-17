import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CheckCircle2, Circle, Copy, Check, AlertCircle, Rocket } from 'lucide-react';
import {
  getSubmission,
  saveSubmission,
  getSteps,
  toggleStep,
  isValidUrl,
  areAllLinksProvided,
  generateSubmissionText,
  FinalSubmission,
  StepStatus
} from '../utils/submission';
import { getProjectStatus, getShippedRequirements } from '../utils/shippedStatus';
import { copyToClipboard } from '../utils/exportUtils';

export const ProofPage: React.FC = () => {
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<FinalSubmission>({
    lovableLink: '',
    githubLink: '',
    deployedUrl: ''
  });
  const [steps, setSteps] = useState<StepStatus[]>([]);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [projectStatus, setProjectStatus] = useState<string>('Not Started');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setSubmission(getSubmission());
    setSteps(getSteps());
    setProjectStatus(getProjectStatus());
  };

  const handleInputChange = (field: keyof FinalSubmission, value: string) => {
    const updated = { ...submission, [field]: value };
    setSubmission(updated);
    saveSubmission(updated);
    
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Update project status
    setProjectStatus(getProjectStatus());
  };

  const validateUrl = (field: keyof FinalSubmission) => {
    const value = submission[field];
    if (value && !isValidUrl(value)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter a valid URL (must start with http:// or https://)' }));
      return false;
    }
    return true;
  };

  const handleStepToggle = (stepId: number) => {
    const updated = toggleStep(stepId);
    setSteps(updated);
    setProjectStatus(getProjectStatus());
  };

  const handleCopySubmission = async () => {
    // Validate all URLs before copying
    let hasErrors = false;
    ['lovableLink', 'githubLink', 'deployedUrl'].forEach(field => {
      if (!validateUrl(field as keyof FinalSubmission)) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      alert('Please fix URL errors before copying submission');
      return;
    }

    try {
      const text = generateSubmissionText(submission);
      await copyToClipboard(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy to clipboard');
    }
  };

  const completedSteps = steps.filter(s => s.completed).length;
  const allLinksProvided = areAllLinksProvided(submission);
  const requirements = getShippedRequirements();
  const isShipped = projectStatus === 'Shipped';

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold mb-4">Proof & Submission</h1>
      <p className="text-gray-600 mb-10 max-w-reading">
        Document your work and prepare for final submission.
      </p>

      {/* Project Status */}
      <Card className={`mb-6 ${isShipped ? 'bg-success/10 border-success/30' : 'bg-blue-50/50 border-blue-200'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Project Status</p>
            <p className="text-3xl font-serif font-bold text-foreground">{projectStatus}</p>
          </div>
          {isShipped && (
            <Rocket className="w-12 h-12 text-success" />
          )}
        </div>
      </Card>

      {/* Shipped Requirements */}
      {!isShipped && (
        <Card className="mb-6 bg-warning/10 border-warning/30">
          <h3 className="text-lg font-serif font-semibold mb-4">Requirements for "Shipped" Status</h3>
          <div className="space-y-2">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {req.met ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-warning" />
                )}
                <p className={`text-sm ${req.met ? 'text-gray-600' : 'text-foreground font-medium'}`}>
                  {req.label}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Completion Message */}
      {isShipped && (
        <Card className="mb-6 bg-success/10 border-success/30">
          <div className="text-center py-6">
            <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-4">You built a real product.</h2>
            <p className="text-gray-700 max-w-reading mx-auto leading-relaxed">
              Not a tutorial. Not a clone.<br />
              A structured tool that solves a real problem.<br />
              <span className="font-semibold">This is your proof of work.</span>
            </p>
          </div>
        </Card>
      )}

      {/* Step Completion Overview */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold">Step Completion Overview</h2>
          <p className="text-lg font-medium text-foreground">
            {completedSteps} / {steps.length} Steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => handleStepToggle(step.id)}
              className="flex items-center gap-3 p-4 border border-border rounded-md hover:bg-background transition-colors text-left"
            >
              {step.completed ? (
                <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
              )}
              <div>
                <p className={`font-medium ${step.completed ? 'text-gray-500 line-through' : 'text-foreground'}`}>
                  Step {step.id}: {step.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Artifact Inputs */}
      <Card className="mb-6">
        <h2 className="text-2xl font-serif font-bold mb-6">Artifact Links (Required)</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Lovable Project Link <span className="text-accent">*</span>
            </label>
            <Input
              type="url"
              placeholder="https://lovable.dev/projects/..."
              value={submission.lovableLink}
              onChange={(e) => handleInputChange('lovableLink', e.target.value)}
              onBlur={() => validateUrl('lovableLink')}
              className={errors.lovableLink ? 'border-accent' : ''}
            />
            {errors.lovableLink && (
              <p className="text-sm text-accent mt-1">{errors.lovableLink}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              GitHub Repository Link <span className="text-accent">*</span>
            </label>
            <Input
              type="url"
              placeholder="https://github.com/username/repo"
              value={submission.githubLink}
              onChange={(e) => handleInputChange('githubLink', e.target.value)}
              onBlur={() => validateUrl('githubLink')}
              className={errors.githubLink ? 'border-accent' : ''}
            />
            {errors.githubLink && (
              <p className="text-sm text-accent mt-1">{errors.githubLink}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Deployed URL <span className="text-accent">*</span>
            </label>
            <Input
              type="url"
              placeholder="https://your-app.vercel.app"
              value={submission.deployedUrl}
              onChange={(e) => handleInputChange('deployedUrl', e.target.value)}
              onBlur={() => validateUrl('deployedUrl')}
              className={errors.deployedUrl ? 'border-accent' : ''}
            />
            {errors.deployedUrl && (
              <p className="text-sm text-accent mt-1">{errors.deployedUrl}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Export Submission */}
      <Card className="mb-6">
        <h2 className="text-2xl font-serif font-bold mb-4">Final Submission Export</h2>
        <p className="text-sm text-gray-600 mb-6">
          Copy your formatted submission text to share your work.
        </p>
        <Button
          onClick={handleCopySubmission}
          disabled={!allLinksProvided}
          className="flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Final Submission'}
        </Button>
        {!allLinksProvided && (
          <p className="text-sm text-warning mt-2">
            Please provide all three links with valid URLs to copy submission.
          </p>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex gap-4">
        <Button onClick={() => navigate('/prp/07-test')}>
          Back to Test Checklist
        </Button>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};
