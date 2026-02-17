import { AppShell } from './components/layout/AppShell';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { Input } from './components/ui/Input';

function App() {
  return (
    <AppShell 
      projectName="Placement Readiness Platform" 
      stepCurrent={3} 
      stepTotal={8} 
      status="In Progress"
    >
      <div className="flex flex-1 h-full overflow-hidden">
        
        {/* PRIMARY WORKSPACE (70%) */}
        <div className="w-[70%] h-full overflow-y-auto p-10 border-r border-border">
          {/* CONTEXT HEADER */}
          <div className="mb-10 max-w-reading">
            <h1 className="text-4xl text-primary mb-6">Configure Data Schema</h1>
            <p className="text-lg text-primary/70 font-light">
              Define the structural requirements for the candidate database before proceeding to API generation.
            </p>
          </div>

          {/* WORKSPACE CONTENT */}
          <div className="max-w-reading space-y-6">
            <Card>
              <h3 className="text-xl font-serif mb-4">Schema Definition</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-primary/80">Entity Name</label>
                  <Input 
                    type="text" 
                    placeholder="e.g. CandidateProfile"
                  />
                </div>
                <div className="p-4 bg-background/70 border border-border rounded text-sm text-primary/60 font-mono">
                  // Schema preview will appear here...
                </div>
              </div>
            </Card>

            {/* Empty State Example */}
            <div className="border border-dashed border-border rounded-lg p-10 text-center">
              <p className="text-primary/60 mb-4">No validation rules added yet.</p>
              <Button variant="secondary">Add Validation Rule</Button>
            </div>
          </div>
        </div>

        {/* SECONDARY PANEL (30%) */}
        <div className="w-[30%] h-full bg-white/50 p-6 overflow-y-auto flex flex-col">
          <div className="mb-6">
            <h4 className="font-serif text-lg mb-2">Guidance</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ensure your schema includes unique identifiers for every candidate. Avoid using nested arrays for this specific module to maintain query performance.
            </p>
          </div>

          <div className="bg-white border border-border rounded-md p-4 mb-6">
            <div className="text-xs font-bold text-primary/50 uppercase tracking-wider mb-2">Prompt</div>
            <p className="font-mono text-xs text-primary/80 mb-4 break-words">
              Create a PostgreSQL schema for a user profile with fields: id, email, resume_url, and status.
            </p>
            <Button variant="secondary" className="w-full text-sm py-2">Copy Prompt</Button>
          </div>

          <div className="mt-auto space-y-2">
            <Button className="w-full">Build in Lovable</Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" className="w-full text-sm">It Worked</Button>
              <Button variant="secondary" className="w-full text-sm text-accent border-accent/30 hover:bg-accent/10">Error</Button>
            </div>
            <Button variant="secondary" className="w-full text-sm">Add Screenshot</Button>
          </div>
        </div>

      </div>
    </AppShell>
  );
}

export default App;
