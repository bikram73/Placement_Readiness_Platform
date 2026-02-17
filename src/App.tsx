import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardHome, PlaceholderPage } from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="practice" element={<PlaceholderPage title="Practice Problems" />} />
          <Route path="assessments" element={<PlaceholderPage title="Assessments" />} />
          <Route path="resources" element={<PlaceholderPage title="Learning Resources" />} />
          <Route path="profile" element={<PlaceholderPage title="User Profile" />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
