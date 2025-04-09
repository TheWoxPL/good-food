import { Outlet, Navigate } from 'react-router';
import { UserAuth } from '@/context/AuthContext';
import { Spinner } from './Spinner';

export const ProtectedRoute = () => {
  const { user, loading } = UserAuth();

  if (!loading && user == null) {
    return <Navigate to="/login" replace />;
  }

  // TODO: Add loading short animation or put empty div
  if (loading) {
    return <Spinner />;
  }

  return <Outlet />;
};
