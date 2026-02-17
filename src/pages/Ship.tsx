import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Lock, CheckCircle2, Rocket } from 'lucide-react';
import { isAllTestsPassed, getPassedCount } from '../utils/testChecklist';

export const ShipPage: React.FC = () => {
  const navigate = useNavigate();
  const [allPassed, setAllPassed] = useState(false);
  const [passedCount, setPassedCount] = useState(0);

  useEffect(() => {
    setAllPassed(isAllTestsPassed());
    setPassedCount(getPassedCount());
  }, []);

  if (!allPassed) {
    return (
      <div>
        <h1 className="text-4xl font-serif font-bold mb-4">Ship Platform</h1>
        <p className="text-gray-600 mb-10 max-w-reading">
          Complete all tests before shipping the platform.
        </p>

        <Card className="text-center py-16 bg-warning/10 border-warning/30">
          <Lock className="w-16 h-16 text-warning mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-bold mb-4">Shipping Locked</h2>
          <p className="text-gray-600 mb-2">
            You must complete all {10} tests before shipping.
          </p>
          <p className="text-lg font-medium text-foreground mb-6">
            Current Progress: {passedCount} / 10 tests passed
          </p>
          <Button onClick={() => navigate('/prp/07-test')}>
            Go to Test Checklist
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-serif font-bold mb-4">Ship Platform</h1>
      <p className="text-gray-600 mb-10 max-w-reading">
        All tests passed! Your platform is ready to ship.
      </p>

      <Card className="bg-success/10 border-success/30 mb-6">
        <div className="text-center py-10">
          <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-6" />
          <h2 className="text-2xl font-serif font-bold mb-4">All Tests Passed!</h2>
          <p className="text-gray-600 mb-6">
            Your Placement Readiness Platform has passed all quality checks and is ready for deployment.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Deploy to Production
            </Button>
            <Button variant="secondary" onClick={() => navigate('/prp/07-test')}>
              Review Tests
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-serif font-semibold mb-4">Deployment Checklist</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <p className="text-foreground">All functional tests passed</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <p className="text-foreground">Data validation implemented</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <p className="text-foreground">Edge cases handled</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <p className="text-foreground">Premium design maintained</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <p className="text-foreground">LocalStorage persistence working</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
