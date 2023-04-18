import * as Yup from 'yup';
import moment from 'moment';
import validator from 'validator';
import { dateValidation } from './dateValidation';

export const validationSchemaHandler = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string()
    .min(5, 'username should have at least 5 characters')
    .max(30, 'username shoould have maximum 30 characters')
    .required('Required'),
  password: Yup.string()
    .min(8, 'username should have at least 8 characters')
    .max(255, 'password should have maximum 255 characters')
    .required('Required'),
  phoneNumber: Yup.string().test('phone-number', 'wrong-number', (val) => {
    if (!val) return true;
    return validator.isMobilePhone(val.replaceAll(' ', ''), 'any', { strictMode: true });
  }),
  firstName: Yup.string().max(80, 'First name should have maximum 80 characters'),
  lastName: Yup.string().max(80, 'Last name should have maximum 80 characters'),
  biography: Yup.string().max(500, 'Biography should have maximum 500 characters'),
  website: Yup.string().test('website', 'wrong url website', (val) => {
    if (!val) return true;
    return validator.isURL(val);
  }),
  birthday: Yup.string().test('birth-date', 'wrong date format!', (val) => {
    if (!val) return true;

    return (
      validator.isDate(moment(new Date(val)).format('YYYY-MM-DD'), {
        format: 'YYYY-MM-DD',
        strictMode: true,
      }) && //
      dateValidation(val)
    );
  }),
});

export const validationSchemaHandlerForEdit = Yup.object().shape({
  phoneNumber: Yup.string().test('phone-number', 'wrong-number', (val) => {
    if (!val) return true;
    return validator.isMobilePhone(val.replaceAll(' ', ''), 'any', { strictMode: true });
  }),
  firstName: Yup.string().max(80, 'First name should have maximum 80 characters'),
  lastName: Yup.string().max(80, 'Last name should have maximum 80 characters'),
  biography: Yup.string().max(500, 'Biography should have maximum 500 characters'),
  website: Yup.string().test('website', 'wrong url website', (val) => {
    if (!val) return true;
    return validator.isURL(val);
  }),
  birthday: Yup.string().test('birth-date', 'wrong date format!', (val) => {
    if (!val) return true;

    let today = new Date().getTime();

    return (
      validator.isDate(moment(new Date(val)).format('YYYY-MM-DD'), {
        format: 'YYYY-MM-DD',
        strictMode: true,
      }) && today >= new Date(val).getTime()
    );
  }),
});
