import { useState } from 'react';
import { removeUserFromApi } from '../../../../../api/users';

export const useUserRemover = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const removeUser = async (userId: string) => {
    try {
      setIsLoading(true);
      await removeUserFromApi(userId);
      // window.location.reload();
    } catch (error: any) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage(error.response.data.message);
      console.log(error);
    }
  };
  return { removeUser, isLoading, isError, errorMessage };
};
