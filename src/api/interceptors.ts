import { instance } from './instance';
import { AxiosRequestConfig } from 'axios';
import { clearSession, getTokensFromSession, setSession } from '../services/AuthService';
import { getNewTokensByRefreshToken } from './membership';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh';

export const instanceInterceptor = () => {
  console.log(getTokensFromSession().accessToken);
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    (config.headers ? config.headers : {}).Authorization = `Bearer ${getTokensFromSession().accessToken}`;

    return config;
  });

  const retryFailedRequests = async (failedRequest: { config: AxiosAuthRefreshRequestConfig }) => {
    try {
      let response = await getNewTokensByRefreshToken();

      setSession(response.data.accessToken, response.data.refreshToken, response.data.expiresAt);
      if (failedRequest.config.headers)
        failedRequest.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return Promise.resolve();
    } catch (error) {
      clearSession();
    }
  };

  createAuthRefreshInterceptor(instance, retryFailedRequests, {
    statusCodes: [401, 403],
  });
};
