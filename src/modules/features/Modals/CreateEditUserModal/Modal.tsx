import { useEffect, useState } from 'react';
import { Modal as ModalElement, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from 'reactstrap';
import { BiErrorCircle } from 'react-icons/bi';
import { UserForm as Form } from '../../Form/Form';
import { ErrorAlert } from '../../../../components/shared/ErrorAlert';
import { ModalProps } from '../../../../types/modalTypes';
//CUSTOM HOOKS
import { useUserCreator } from '../../dashboard/Users/hooks/useUserCreator';
import { useUserEditor } from '../../dashboard/Users/hooks/useUserEditor';
import wave from '../../../../assets/svg/wave.svg';

export const Modal = ({ isModalOpen, toggleHandler, user, setUser }: ModalProps) => {
    //
    const { createUser, isErrorFromCreator, errorMsgFromCreator, setIsErrorFromCreator } = useUserCreator();
    const { editCurrentUser, isErrorFromEdit, errorMsgFromEditor, isSubmiting } = useUserEditor();
    const [isSaveButtonForEditActive, setIsSaveButtonForEditActive] = useState<boolean>(false);

    //disable error when form value changes
    const disableError = () => {
        setIsErrorFromCreator(false);
    };

    // Activate button when form value is not equal to initial value
    const toggleSaveButtonOnEdit = (bool: boolean) => {
        setIsSaveButtonForEditActive(bool);
    };

    // Set user state to null after component unmounts
    useEffect(() => {
        return () => {
            setUser(null);
        };
    }, [setUser]);

    return (
        <ModalElement centered size='lg' isOpen={isModalOpen} toggle={toggleHandler}>
            <ModalHeader
                toggle={toggleHandler}
                style={{ backgroundImage: `url(${wave})`, backgroundSize: 'cover', color: 'white' }}
            >
                {user ? 'Edit user' : 'Create new user'}
            </ModalHeader>
            <ModalBody>
                {/* Define if the error is an array or a string, and check whether error comes from user creator or user editor*/}
                {isErrorFromCreator ? (
                    typeof errorMsgFromCreator === 'object' ? (
                        errorMsgFromCreator.map((err: string, index: number) => (
                            <ErrorAlert key={index}>{err}</ErrorAlert>
                        ))
                    ) : (
                        <ErrorAlert>{errorMsgFromCreator}</ErrorAlert>
                    )
                ) : isErrorFromEdit ? (
                    typeof errorMsgFromEditor === 'object' ? (
                        errorMsgFromEditor.map((err: string, index: number) => (
                            <ErrorAlert key={index}>{err}</ErrorAlert>
                        ))
                    ) : (
                        <ErrorAlert>{errorMsgFromEditor}</ErrorAlert>
                    )
                ) : null}

                <Form
                    createUser={createUser}
                    setIsError={disableError}
                    isError={isErrorFromCreator}
                    user={user}
                    editCurrentUser={editCurrentUser}
                    toggleSaveButtonOnEdit={toggleSaveButtonOnEdit}
                    setUser={setUser}
                />
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggleHandler}>Close</Button>
                <Button
                    form={user ? 'editUser' : `newUser`}
                    type='submit'
                    // color={isErrorFromEdit || isErrorFromCreator ? 'danger' : 'primary'}
                    style={
                        isErrorFromEdit || isErrorFromCreator
                            ? { backgroundColor: 'danger' }
                            : { backgroundColor: '#007EA7' }
                    }
                    disabled={!isSaveButtonForEditActive && !!user}
                >
                    {user ? (
                        isSubmiting ? (
                            isErrorFromEdit ? (
                                <>
                                    <BiErrorCircle style={{ marginRight: '5px' }} />
                                    <span>Erorr</span>
                                </>
                            ) : (
                                <>
                                    <Spinner size='sm' />
                                    <span> Saving..</span>
                                </>
                            )
                        ) : (
                            'Save'
                        )
                    ) : (
                        'Create'
                    )}
                </Button>
            </ModalFooter>
        </ModalElement>
    );
};
