import { Button, ModalFooter, Spinner } from 'reactstrap';
import { UserRemoveModalFooterProps } from '../../../../types/types';

export const UserRemoveModalFooter = ({
  email,
  id,
  removeUser,
  toggleHandler,
  userRemoveInputValue,
  isError,
  isLoading,
  setSubmitButtonError,
}: UserRemoveModalFooterProps) => {
  //
  return (
    <ModalFooter className='border-0'>
      <Button onClick={toggleHandler}>Cancel</Button>
      <Button
        className={`SubmitButtonUserRemove `}
        form='newUser'
        type='submit'
        color='danger'
        onClick={() => {
          if (email === userRemoveInputValue && !isError) {
            removeUser(id);
          } else if (email !== userRemoveInputValue || isError) {
            setSubmitButtonError(true);
          }
        }}
      >
        {isLoading ? (
          <>
            <Spinner size='sm' />
            <span> Loading...</span>
          </>
        ) : (
          ' Delete'
        )}
      </Button>
    </ModalFooter>
  );
};
