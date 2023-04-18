import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../../services/AuthService';

export const IsLoggedInRoute = () => {
  return isAuthenticated() ? <Navigate to={`dashboard/users?page=1`} /> : <Outlet />;
};

export const ErorrRoutes = () => {
  return isAuthenticated() ? <Navigate to={`dashboard/users?page=1`} /> : <Navigate to='/' />;
};
