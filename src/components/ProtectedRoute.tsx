import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If authenticated but no role selected yet
  if (!user?.role) {
    return <Navigate to="/auth/role" replace />;
  }

  // If role is restricted and doesn't match
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'homeowner' ? '/home' : '/tp/dashboard'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
