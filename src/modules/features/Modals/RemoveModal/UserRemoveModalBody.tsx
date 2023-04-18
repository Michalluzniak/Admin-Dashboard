import { Badge, Input, ModalBody } from 'reactstrap';
import { ErrorAlert } from '../../../../components/shared/ErrorAlert';
import { UserRemoveModalBodyProps } from '../../../../types/modalTypes';

export const UserRemoveModalBody = ({
  isError,
  errorMessage,
  username,
  email,
  setUserRemoveInputValue,
  userRemoveInputValue,
}: UserRemoveModalBodyProps) => {
  //
  return (
    <ModalBody className='text-center'>
      {isError && <ErrorAlert>{errorMessage}</ErrorAlert>}
      To delete user:
      {
        <Badge color='danger' className='m-1'>
          {username}
        </Badge>
      }
      with email adress:
      {
        <Badge color='danger' className='m-1'>
          {email}
        </Badge>
      }
      write email below:
      <Input
        type='text'
        onChange={(e) => setUserRemoveInputValue(e.target.value)}
        value={userRemoveInputValue}
        className={`mt-4 border border-2 ${
          userRemoveInputValue !== ''
            ? email !== userRemoveInputValue || isError
              ? 'border-danger'
              : 'border-success'
            : 'border-secondary'
        } `}
        valid={email === userRemoveInputValue && userRemoveInputValue !== ''}
        invalid={(email !== userRemoveInputValue && userRemoveInputValue !== '') || isError}
      />
      {email !== userRemoveInputValue && userRemoveInputValue !== '' && (
        <p className='text-danger'>Email is incorrect!</p>
      )}
    </ModalBody>
  );
};
