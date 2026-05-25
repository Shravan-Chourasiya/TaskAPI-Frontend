import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  
  if (auth.isLoading) {
    return <LoadingSpinner />;
  }
  
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
