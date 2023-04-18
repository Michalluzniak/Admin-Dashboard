import { useState } from 'react';
// AXIOS REQUESTS
import { createUserForApi } from '../../../../../api/users';
// INTERFACES
import { InitialValuesProps } from '../../../../../types/formTypes';

export const useUserCreator = () => {
  const [isErrorFromCreator, setIsErrorFromCreator] = useState<boolean>(false);
  const [errorMsgFromCreator, setErrorMsgArrayFromCreator] = useState<
    string[] | string
  >('');
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const createUser = async (valuesObj: InitialValuesProps) => {
    if (!valuesObj || isErrorFromCreator || isSubmiting) return;

    // FILTER PROPERTIES TO PREVENT EMPTY VALUES IN API CALL
    let res = Object.fromEntries(
      Object.entries(valuesObj).filter((item) => !item.includes(''))
    );
    res.phoneNumber = res.phoneNumber && res.phoneNumber.replaceAll(' ', '');

    try {
      setIsSubmiting(true);
      await createUserForApi(res);
      window.location.reload();
      setIsSubmiting(false);
    } catch (error: any) {
      setIsSubmiting(false);
      console.log(error);
      setIsErrorFromCreator(true);
      setErrorMsgArrayFromCreator(error.response.data.message);
    }
  };

  return {
    createUser,
    isErrorFromCreator,
    errorMsgFromCreator,
    setIsErrorFromCreator,
  };
};
