import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string;
}) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  if (!authContext) {
    throw new Error('AuthContext.Provider is missing!');
  }

  const { user, loading } = authContext;

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user && !loading) {
    alert('You must be logged in!');
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (user && role !== user.role) {
    alert('Usuario y contraseña incorrecto');
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
};
export default PrivateRoute;
