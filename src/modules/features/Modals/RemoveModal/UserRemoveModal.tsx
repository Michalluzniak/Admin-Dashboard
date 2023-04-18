import { useState } from 'react';

import { Modal as ModalElement, ModalHeader } from 'reactstrap';
import { UserRemoveModalProps } from '../../../../types/modalTypes';
import { useUserRemover } from '../../dashboard/Users/hooks/useUserRemover';
import { UserRemoveModalBody } from './UserRemoveModalBody';
import { UserRemoveModalFooter } from './UserRemoveModalFooter';
import wave from '../../../../assets/svg/wave.svg';

export const UserRemoveModal = ({
    username,
    email,
    id,
    open,
    toggleHandler,
}: UserRemoveModalProps) => {
    const { removeUser, isLoading, isError, errorMessage } = useUserRemover();
    const [submitButtonError, setSubmitButtonError] = useState<boolean>(false);
    const [userRemoveInputValue, setUserRemoveInputValue] =
        useState<string>('');

    // MODAL INPUT VALUE
    const setUserRemoveInputValueHandler = (e: string) => {
        setUserRemoveInputValue(e);
    };

    // ANIMATION HANDLER FOR ERROR
    const setSubmitButtonErrorHandler = () => {
        setSubmitButtonError(true);
        setTimeout(() => setSubmitButtonError(false), 1000);
    };

    return (
        <ModalElement
            centered
            isOpen={open}
            toggle={toggleHandler}
            className={`${submitButtonError && 'error'} `}
        >
            <ModalHeader
                className='text-light  border-bottom border-1 border-dark'
                style={{
                    backgroundImage: `url(${wave})`,
                    backgroundSize: 'cover',
                }}
            >
                Confirm user deletion
            </ModalHeader>

            <UserRemoveModalBody
                isError={isError}
                errorMessage={errorMessage}
                username={username}
                email={email}
                userRemoveInputValue={userRemoveInputValue}
                setUserRemoveInputValue={setUserRemoveInputValueHandler}
            />

            <UserRemoveModalFooter
                email={email}
                id={id}
                removeUser={removeUser}
                toggleHandler={toggleHandler}
                userRemoveInputValue={userRemoveInputValue}
                isError={isError}
                isLoading={isLoading}
                submitButtonError={submitButtonError}
                setSubmitButtonError={setSubmitButtonErrorHandler}
            />
        </ModalElement>
    );
};
