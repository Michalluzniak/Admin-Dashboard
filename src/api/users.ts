import { InitialValuesPropsWithId } from '../types/formTypes';
import { UserListProps } from '../types/userTypes';
import { apiCall } from './apiCallHandler';

import { instanceInterceptor } from './interceptors';

export interface UsersApiCallResponse {
  data: [UserListProps];
  pagination: {};
}
const defaultPageSize = 10;

instanceInterceptor();

export const getUsers = (page: number, pageSize: number = defaultPageSize): Promise<UsersApiCallResponse> => {
  return apiCall('GET', 'users', {
    params: { page, resultsPerPage: pageSize },
  });
};

export const getUserById = (userId: string): Promise<InitialValuesPropsWithId> => {
  return apiCall<{ [data: string]: InitialValuesPropsWithId }>('GET', `users/${userId}`).then((res) => res.data);
};

export const editUser = (userId: string, editedFormValue: { [key: string]: string }) => {
  return apiCall('PATCH', `users/${userId}`, { data: { ...editedFormValue } });
};

export const removeUserFromApi = (id: string) => {
  return apiCall('DELETE', `users/${id}`);
};

export const createUserForApi = (formValue: { [key: string]: string }) => {
  return apiCall('POST', 'users', {
    data: { ...formValue },
  });
};
