import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoute from './AdminRoute';

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
	);
};

export default AppRoutesLazy;



