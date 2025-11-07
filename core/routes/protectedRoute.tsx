import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@core/redux';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// TODO: check user domain and change front end 

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector((state: any) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/hrlink/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
