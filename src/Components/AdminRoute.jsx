import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
	const location = useLocation();
	const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
	const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

	if (!token || role !== 'Admin') {
		return <Navigate to="/" replace state={{ from: location }} />;
	}

	return children;
};

export default AdminRoute;