import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

const ProtectedRouteElement: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children,
}) => {
  const { isAuthenticated } = useTypedSelector((state) => state.authReducer);
  const location = useLocation();

  if (!isAuthenticated && !onlyUnAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isAuthenticated && onlyUnAuth) {
    // Авторизован, но пытается попасть на страницу логина, регистрации и т.п.
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRouteElement;
