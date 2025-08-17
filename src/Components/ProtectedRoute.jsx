import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const location = useLocation();
	const token = typeof window !== 'undefined'
		? localStorage.getItem('accessToken')
		: null;
	// Role is optional for general protected routes
	if (!token) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	return children;
};

export default ProtectedRoute;
