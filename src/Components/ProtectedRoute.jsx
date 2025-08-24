import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // Kontrollo nëse user-i është i loguar
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    return !!(accessToken && userId);
  };

  if (!isAuthenticated()) {
    // Redirect në welcome nëse nuk është i loguar
    return <Navigate to="/welcome" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
