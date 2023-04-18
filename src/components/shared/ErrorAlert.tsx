import { Alert } from 'reactstrap';

type ErrorMsgChildren = {
  children: string;
  style?: any;
};

export const ErrorAlert = ({ children, ...props }: ErrorMsgChildren) => {
  return (
    <Alert {...props} color='danger'>
      {children}
    </Alert>
  );
};
