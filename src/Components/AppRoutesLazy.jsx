import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import ProtectedRoute from './ProtectedRoute';

import WelcomePage from './WelcomePage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Home from './Home';
import Dashboard from './Dashboard';
import PetsPage from './PetsPage';
import CareTasksPage from './CareTaskPage';
import VisitsPage from './VisitsPage';
import CareGuide from './CareGuide';
import AdminPage from './AdminPage';

const AppRoutesLazy = () => {
	return (
		<Routes>
			{/* Public routes - accessible without login */}
			<Route path="/welcome" element={<WelcomePage />} />
			<Route path="/login" element={<LoginForm />} />
			<Route path="/register" element={<RegisterForm />} />

			{/* Protected routes - require login */}
			<Route path="/" element={
				<ProtectedRoute>
					<Home />
				</ProtectedRoute>
			} />
			<Route path="/home" element={
				<ProtectedRoute>
					<Home />
				</ProtectedRoute>
			} />
			<Route path="/dashboard" element={
				<ProtectedRoute>
					<Dashboard />
				</ProtectedRoute>
			} />
			<Route path="/pets" element={
				<ProtectedRoute>
					<PetsPage />
				</ProtectedRoute>
			} />
			<Route path="/tasks" element={
				<ProtectedRoute>
					<CareTasksPage />
				</ProtectedRoute>
			} />
			<Route path="/visits" element={
				<ProtectedRoute>
					<VisitsPage />
				</ProtectedRoute>
			} />
			<Route path="/care-guide" element={
				<ProtectedRoute>
					<CareGuide />
				</ProtectedRoute>
			} />
			<Route path="/admin" element={
				<AdminRoute>
					<AdminPage />
				</AdminRoute>
			} />

			{/* Default redirect to welcome */}
			<Route path="*" element={<Navigate to="/welcome" replace />} />
		</Routes>
	);
};

export default AppRoutesLazy;




