import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoute from './AdminRoute';

const WelcomePage = lazy(() => import('./WelcomePage'));
const LoginForm = lazy(() => import('./LoginForm'));
const RegisterForm = lazy(() => import('./RegisterForm'));
const Home = lazy(() => import('./Home'));
const Dashboard = lazy(() => import('./Dashboard'));
const PetsPage = lazy(() => import('./PetsPage'));
const CareTasksPage = lazy(() => import('./CareTaskPage'));
const VisitsPage = lazy(() => import('./VisitsPage'));
const CareGuide = lazy(() => import('./CareGuide'));
const AdminPage = lazy(() => import('./AdminPage'));

const AppRoutesLazy = () => {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', color: '#5c4033', textAlign: 'center' }}>Loading…</div>}>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/pets" element={<PetsPage />} />
        <Route path="/tasks" element={<CareTasksPage />} />
        <Route path="/visits" element={<VisitsPage />} />
        <Route path="/care-guide" element={<CareGuide />} />
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutesLazy;
