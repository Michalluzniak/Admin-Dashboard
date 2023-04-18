import { ErrorMessage, useField } from 'formik';
import { Label, FormGroup, FormFeedback, Input } from 'reactstrap';
import { Props } from '../../../../types/types';

export const DefaultField = ({ label, col = 'col-6', isError, labelProps, ...props }: Props) => {
  const [field, meta] = useField(props.name);

  return (
    <FormGroup className={`d-flex flex-column ${col}`}>
      <Label htmlFor={props.name} className={labelProps}>
        {label}
      </Label>
      <Input
        {...field}
        {...props}
        valid={!meta.error && meta.touched && meta.value !== '' && meta.initialValue !== meta.value}
        invalid={(!!meta.error && meta.touched) || (isError && field.value !== '')}
      />
      <FormFeedback className='text-center'>
        <ErrorMessage name={props.name} />
      </FormFeedback>
    </FormGroup>
  );
};
