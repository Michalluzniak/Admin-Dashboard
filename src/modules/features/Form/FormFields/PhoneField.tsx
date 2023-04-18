import { useState } from 'react';
import { ErrorMessage, useField } from 'formik';
import { Label, FormGroup, FormFeedback, Input, InputGroup } from 'reactstrap';
import { PhoneCodesBtn } from './PhoneCodesBtn';
import { Props } from '../../../../types/types';
import dialCodes from '../../../../json/dialCodes.json';

export const PhoneField = ({ label, col = 'col-6', initValue, user, ...props }: Props) => {
  //
  // search dial code from given phone number
  let dialCodeFromNumber = initValue
    ? dialCodes.filter((code) => initValue.startsWith(code.dial_code))[0].dial_code
    : '';

  // replace given phone number dial code with empty string
  let initValueFromId = initValue && initValue.replace(dialCodeFromNumber, '');

  const [code, setCode] = useState('+48');
  const [inputVal, setInputVal] = useState<string>(initValue ? initValueFromId : '');
  const [field, meta, helpers] = useField(props.name);

  // remove dial code, so user can't see it in input directly
  const dialCode = (dialCode: string) => {
    setCode(dialCode);
    helpers.setValue(dialCode + field.value.replace(code, ''));
  };

  // allowed phone number formats: ddd ddd ddd or ddd ddd dddd
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 10)}`;
  };

  return (
    <FormGroup className={`d-flex flex-column ${col}`}>
      <Label htmlFor={props.name}>{label}</Label>
      {/* Input Group component for dialCodes button */}
      <InputGroup>
        <PhoneCodesBtn codeHandler={dialCode} dialCodeFromNumbers={dialCodeFromNumber && dialCodeFromNumber} />
        <Input
          {...field}
          {...props}
          onChange={(e) => {
            helpers.setValue(`${initValue ? dialCodeFromNumber : code} ${formatPhoneNumber(e.target.value)}`);
            setInputVal(e.target.value);
          }}
          value={formatPhoneNumber(inputVal)}
          id={props.name}
          valid={!meta.error && meta.touched && meta.value !== '' && user && meta.initialValue !== meta.value}
          invalid={!!meta.error && meta.touched}
        />
        <FormFeedback className='text-center'>
          <ErrorMessage name={props.name} />
        </FormFeedback>
      </InputGroup>
    </FormGroup>
  );
};
