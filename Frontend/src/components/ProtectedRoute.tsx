import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

function ProtectedRoute({
  children,
  roles,
}: ProtectedRouteProps) {
  const token =
    localStorage.getItem('token');

  const role =
    localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (
    roles &&
    role &&
    !roles.includes(role)
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <>{children}</>;
}

export default ProtectedRoute;
