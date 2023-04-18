import { ErrorMessage, useField } from 'formik';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Label, FormGroup, FormFeedback, Input } from 'reactstrap';
import { Props } from '../../../../types/types';

export const DateField = ({ label, col, ...props }: Props) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <FormGroup className={`d-flex flex-column ${col}`}>
      <Label htmlFor={props.name}>{label}</Label>
      <Input
        tag={DatePicker}
        {...field}
        {...props}
        dateFormat='yyyy-MM-dd'
        yearDropdownItemNumber={100}
        scrollableYearDropdown={true}
        showYearDropdown
        showMonthDropdown
        minDate={new Date('1900-01-01')}
        maxDate={new Date()}
        autoComplete='off'
        selected={moment(field.value).valueOf()}
        onChange={(value: {}) => {
          value === null ? helpers.setValue('') : helpers.setValue(value);
        }}
        valid={!meta.error && meta.value !== '' && meta.initialValue !== meta.value}
        invalid={!!meta.error}
      />
      <FormFeedback className='text-center'>
        <ErrorMessage name={props.name} />
      </FormFeedback>
    </FormGroup>
  );
};
