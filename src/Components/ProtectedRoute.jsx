import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const location = useLocation();

  // Nëse nuk jeni authenticated, redirect në /login
  if (!accessToken || !userId) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
