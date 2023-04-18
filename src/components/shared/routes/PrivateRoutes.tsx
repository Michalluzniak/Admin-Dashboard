import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../../services/AuthService';

export const PrivateRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to='/' />;
};
