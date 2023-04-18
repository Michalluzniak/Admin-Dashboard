import { useState } from 'react';
// AXIOS REQUESTS
import { editUser } from '../../../../../api/users';
// INTERFACES
import { InitialValuesProps, InitialValuesPropsForEdit } from '../../../../../types/formTypes';

export const useUserEditor = () => {
  //
  const [isErrorFromEdit, setIsErrorFromEdit] = useState<boolean>(false);
  const [errorMsgFromEditor, setErrorMsgFromEditor] = useState<string[] | string>('');
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const editCurrentUser = async (
    id: string,
    editedFormValue: InitialValuesPropsForEdit,
    initialValue: InitialValuesProps
  ) => {
    //
    if (isErrorFromEdit || isSubmiting) return;

    // FILTER OUT EMPTY FIELDS AND FORMAT PHONE NUMBER
    editedFormValue.phoneNumber = editedFormValue.phoneNumber && editedFormValue.phoneNumber.replaceAll(' ', '');

    let res = Object.fromEntries(
      Object.entries(editedFormValue)
        .filter((item) => !item.includes(''))
        .filter((item) => {
          let propertyName = item[0];
          return item[1] !== initialValue[propertyName as keyof typeof initialValue];
        })
    );
    // DELETE UNCHANGEABLE FIELDS FROM CALL
    delete res.email;
    delete res.username;

    // SEND PATCH REQUEST
    try {
      setIsSubmiting(true);
      await editUser(id, res);
      setIsSubmiting(false);
      window.location.reload();
    } catch (error: any) {
      setIsErrorFromEdit(true);
      setErrorMsgFromEditor(error.response.data.message);
      console.log(error);
    }
  };
  return { editCurrentUser, isErrorFromEdit, errorMsgFromEditor, isSubmiting };
};
