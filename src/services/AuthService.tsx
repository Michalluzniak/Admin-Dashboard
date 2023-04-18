import Cookies from 'js-cookie';
import { getTokens } from '../api/membership';

export const isAuthenticated = () => {
  return !!Cookies.get('accessToken') || !!Cookies.get('refreshToken');
};

export const setSession = (accessToken: string, refreshToken: string, expiresAt: string) => {
  Cookies.set('accessToken', accessToken, { expires: new Date(expiresAt) });
  Cookies.set('refreshToken', refreshToken);
};

export const getTokensFromSession = () => {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  return { accessToken, refreshToken };
};

export const performLogin = async (username: string, password: string) => {
  return getTokens(username, password).then((response) =>
    setSession(response.accessToken, response.refreshToken, response.expiresAt)
  );
};

export const clearSession = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  window.location.reload();
};
