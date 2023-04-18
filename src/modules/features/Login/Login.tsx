import { Formik, Form, Field } from 'formik';
import { Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { performLogin } from '../../../services/AuthService';
import { useState } from 'react';
import { ErrorAlert } from '../../../components/shared/ErrorAlert';
import wave from '../../../assets/svg/wave.svg';
import { AxiosError } from 'axios';

export const Login = () => {
    const [isError, setIsError] = useState<boolean>(false);
    let navigate = useNavigate();
    const onLoginFormSubmit = ({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) => {
        performLogin(username, password)
            .then(() => {
                navigate('/dashboard/users');
            })
            .catch((error: Error | AxiosError) => {
                setIsError(true);
            });
    };

    return (
        <div
            className='formikLoginContainer'
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
                width: '100%',
            }}
        >
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={null}
                onSubmit={(val: { username: string; password: string }) =>
                    onLoginFormSubmit(val)
                }
            >
                <Form
                    style={{
                        display: 'grid',
                        gridTemplate: '1fr 2fr 1fr / 1fr 3fr 1fr',
                        height: '70%',
                        width: '50%',
                        backgroundImage: `url(${wave})`,
                        backgroundSize: 'cover',
                        borderRadius: '15px',
                    }}
                >
                    <p
                        className='text-light h3'
                        style={{
                            gridArea: '1 / 1 / 2 / 4',
                            alignSelf: 'center',
                        }}
                    >
                        Welcome back!
                    </p>
                    {isError && (
                        <ErrorAlert
                            style={{
                                gridArea: '1 / 1 / 2 / 5',
                                width: '90%',
                                height: '50%',
                                justifySelf: 'center',
                                alignSelf: 'center',
                            }}
                        >
                            Wrong username or password!
                        </ErrorAlert>
                    )}
                    <div
                        style={{
                            gridArea: '2 / 1 / 3 / 4',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Input
                            tag={Field}
                            type='text'
                            name='username'
                            className='w-50 border-0 border-bottom rounded-0 h-25 bg-transparent outline-0 text-light login'
                            placeholder='Login'
                        />
                        <Input
                            tag={Field}
                            type='password'
                            name='password'
                            className='my-4 w-50  border-0 border-bottom rounded-0 h-25 bg-transparent text-light login'
                            placeholder='Password'
                        />

                        <div className='h-25 w-50 d-flex justify-content-between align-items-center justify-content-between'>
                            <button className='text-light text-decoration-none'>
                                Forgot password?
                            </button>
                            <Button
                                type='submit'
                                className='w-50 h-75 btn-outline-light rounded-0 bg-transparent login-btn'
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};
