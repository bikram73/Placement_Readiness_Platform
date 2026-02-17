import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardHome } from './pages/Dashboard';
import { PracticePage } from './pages/Practice';
import { AssessmentsPage } from './pages/Assessments';
import { ResourcesPage } from './pages/Resources';
import { ProfilePage } from './pages/Profile';
import { AnalyzePage } from './pages/Analyze';
import { ResultsPage } from './pages/Results';
import { HistoryPage } from './pages/History';
import { TestChecklistPage } from './pages/TestChecklist';
import { ShipPage } from './pages/Ship';
import { ProofPage } from './pages/Proof';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="assessments" element={<AssessmentsPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="analyze" element={<AnalyzePage />} />
          <Route path="results/:id" element={<ResultsPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>

        {/* PRP Test Routes */}
        <Route path="/prp/proof" element={<ProofPage />} />
        <Route path="/prp/07-test" element={<TestChecklistPage />} />
        <Route path="/prp/08-ship" element={<ShipPage />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
