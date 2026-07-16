import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LandingPage from './pages/Public/LandingPage';
import ServiceSelection from './pages/Public/ServiceSelection';

import FormWizard from './pages/Public/FormWizard';
import Tracking from './pages/Public/Tracking';

import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Submissions from './pages/Admin/Submissions';
import AdminFormCreate from './pages/Admin/AdminFormCreate';
import AdminFormEdit from './pages/Admin/AdminFormEdit';
import DailySubmissions from './pages/Admin/DailySubmissions';
import Archives from './pages/Admin/Archives';
import Login from './pages/Admin/Login';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/layanan" element={<ServiceSelection />} />
        <Route path="/form/:slug" element={<FormWizard />} />
        <Route path="/tracking" element={<Tracking />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="submissions/edit/:id" element={<AdminFormEdit />} />
          <Route path="create" element={<AdminFormCreate />} />
          <Route path="daily-submissions" element={<DailySubmissions />} />
          <Route path="archives" element={<Archives />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
