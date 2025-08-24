import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  // Kontrollo nëse user-i është i loguar
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    return !!(accessToken && userId);
  };

  // Mbroji nga browser back/forward buttons
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isAuthenticated()) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handlePopState = (e) => {
      if (!isAuthenticated()) {
        // Nëse user-i nuk është i loguar, redirect në welcome
        window.history.pushState(null, '', '/welcome');
        window.location.href = '/welcome';
      }
    };

    // Shto event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    // Pastro event listeners kur komponenti unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (!isAuthenticated()) {
    // Redirect në welcome nëse nuk është i loguar
    return <Navigate to="/welcome" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

