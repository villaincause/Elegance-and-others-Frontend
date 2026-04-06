import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the profile page but set mode to login
    // we use state to remember where they were trying to go
    return <Navigate to="/profile?mode=login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;