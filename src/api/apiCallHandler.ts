import { AxiosRequestConfig, Method } from 'axios';
import { instance } from './instance';

export type ApiCallOptions = Omit<AxiosRequestConfig, 'url' | 'method'>;

export const apiCall = <T>(method: Method, url: string, options?: ApiCallOptions) => {
  return instance({ method, url, ...options }).then((response) => {
    return response.data as T;
  });
};
