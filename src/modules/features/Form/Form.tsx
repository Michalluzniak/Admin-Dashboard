import { Formik, Form } from 'formik';
// Form Fields
import { DefaultField } from './FormFields/DefaultField';
import { PhoneField } from './FormFields/PhoneField';
import { DateField } from './FormFields/DateField';
// validation schema
import { validationSchemaHandler, validationSchemaHandlerForEdit } from '../../../utils/schemaValidation';
// Interface props
import { FormProps } from '../../../types/formTypes';
import moment from 'moment';

export const UserForm = ({
  createUser,
  setIsError,
  isError,
  user,
  editCurrentUser,
  toggleSaveButtonOnEdit,
}: FormProps) => {
  //
  const initialValuesHandler = {
    email: user ? user.email : '',
    username: user ? user.username : '',
    password: user ? user.password : '',
    phoneNumber: user ? user.phoneNumber : '',
    firstName: user ? user.firstName : '',
    lastName: user ? user.lastName : '',
    biography: user ? user.biography : '',
    website: user ? user.website : '',
    birthday: user ? user.birthday : '',
  };

  return (
    <Formik
      initialValues={initialValuesHandler}
      validationSchema={user ? validationSchemaHandlerForEdit : validationSchemaHandler}
      validate={(val) => {
        if (user) {
          val.phoneNumber = val.phoneNumber && val.phoneNumber.replaceAll(' ', '');
          if (JSON.stringify(initialValuesHandler) !== JSON.stringify(val)) {
            toggleSaveButtonOnEdit(true);
          } else {
            toggleSaveButtonOnEdit(false);
          }
        }
      }}
      onSubmit={(val) => {
        if (user) {
          if (JSON.stringify(val) === JSON.stringify(initialValuesHandler)) {
            return;
          }
          editCurrentUser(user.id, val, initialValuesHandler);
        } else if (createUser) {
          val.birthday = val.birthday !== '' ? moment(val.birthday).format('YYYY-MM-DD') : '';
          createUser(val);
        }
      }}
    >
      <Form id={user ? `editUser` : 'newUser'} className='row d-flex' onChange={setIsError}>
        <DefaultField type='email' name='email' label='Email*' isError={isError} disabled={!!user} />
        <DefaultField type='text' name='username' label='Username*' isError={isError} disabled={!!user} />
        <DefaultField type='password' name='password' label='Password*' isError={isError} disabled={!!user} />
        <PhoneField name='phoneNumber' label='Phone Number' initValue={user && user.phoneNumber} user={user} />
        <DefaultField type='text' name='firstName' label='First Name' isError={isError} />
        <DefaultField type='text' name='lastName' label='Last Name' isError={isError} />
        <DefaultField type='text' name='website' label='Website' col='col-8' isError={isError} />
        <DateField name='birthday' label='Birthday' col='col-4' isError={isError} />
        <DefaultField type='text' name='biography' label='Biography' isError={isError} />
      </Form>
    </Formik>
  );
};
