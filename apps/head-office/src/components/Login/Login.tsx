import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { detectDevice } from '@projects/common';
import { Image } from '@projects/image';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import Card from '../Card/Card';
import { userInfo } from '../../constants/styles';
import { toggleLoading } from '../../../app/redux/features/isLoading';

interface ILoginProps {
    closeAlert: () => void;
    setLoginFailedData: (
        data: {
            isFailed: boolean;
            message: string;
        }
    ) => void;
};
interface IRequestConfig {
    headers: {
        'Content-Type': string;
    };
};

const Login = ({ closeAlert, setLoginFailedData }: ILoginProps) => {
    const loginInputs = ['Username', 'Password'];
    const [loginFormData, setLoginFormData] = useState({ username: '', password: '' });
    const router = useRouter();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const fetchLoginData = async (data: string, config: IRequestConfig) => {
        try {
            const requestResponse = await axios.post(process.env.LOGIN_URL || '', data, config);

            return requestResponse.data;
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoginSubmit = async () => {
        dispatch(toggleLoading(true));

        const userLoginData = JSON.stringify({
            'userName': loginFormData.username,
            'password': loginFormData.password,
        });
        const requestConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const loginResponse = await fetchLoginData(userLoginData, requestConfig);

        if (loginResponse.statusCode === 200) {
            dispatch(toggleLoading(false));

            router.push('/dashboards');
        } else if (loginResponse.statusCode === 401) {
            dispatch(toggleLoading(false));
            setLoginFailedData({ isFailed: true, message: loginResponse.value.message });
            setTimeout(() => {
                closeAlert();
            }, 5000);
        } else {
            dispatch(toggleLoading(false));
            setLoginFailedData({ isFailed: true, message: 'Hay aksi. Bir şeyler ters gitti!' });
            setTimeout(() => {
                closeAlert();
            }, 5000);
        }
    };

    const cardHeaderChildren = (
        <>
            <div className="sh-card-title-container">
                <h2 className="sh-card-title text-2xl font-semibold">{userInfo.name}</h2>
            </div>
            <div className="sh-card-logo-container">
                <Image alt={`${userInfo.name} logo`} className="sh-card-logo" src={userInfo.logo} />
            </div>
        </>
    );
    const cardBodyChildren = (
        <>
            <div className="sh-card-form-container">
                <form className="sh-card-form" onSubmit={handleSubmit(handleLoginSubmit)}>
                    {
                        loginInputs.map((loginInput, index) => (
                            <div key={index} className="mb-4">
                                <Label
                                    className={`${loginInput.toLowerCase()}-label block text-sm font-medium text-gray-600`}
                                    htmlFor={loginInput.toLowerCase()}
                                    labelText={loginInput}
                                />
                                <Input
                                    className={`${loginInput.toLowerCase()}-input mt-1 p-2 w-full border`}
                                    id={loginInput.toLowerCase()}
                                    name={loginInput.toLowerCase()}
                                    register={register(loginInput.toLowerCase(), {
                                        required: `${loginInput} is required`,
                                        pattern: {
                                            // TODO: Add pattern for username email // /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                                            value: loginInput.toLowerCase() === 'username' ? /^.*$/ : /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$.*])/,
                                            message: `${loginInput} is not valid.`,
                                        },
                                        validate: loginInput.toLowerCase() === 'password'
                                            ? {
                                                checkLength: (value) => value.length >= 8,
                                                matchPattern: (value) =>
                                                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&.*-]).{8,}$/.test(
                                                        value
                                                    )
                                            }
                                            : {},
                                        onChange: (event) => setLoginFormData({ ...loginFormData, [loginInput.toLowerCase()]: event.target.value }),
                                    })}
                                    type={loginInput.toLowerCase() === 'password' ? 'password' : 'text'}

                                />
                                {errors[loginInput.toLowerCase()] && errors[loginInput.toLowerCase()]?.message && (
                                    <div className={`${loginInput.toLowerCase()}-error-wrapper my-4 font-bold text-error`}>
                                        <p className={`${loginInput.toLowerCase()}-error-message`}>
                                            {(errors[loginInput.toLowerCase()]?.message?.toString())}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    }
                    <div className="mb-4">
                        <Button
                            buttonText={'Login'}
                            className={"button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline sh-login-button p-2 w-full"}
                            type={'submit'}
                        />
                    </div>
                </form>
            </div>
        </>
    );
    const cardFooterChildren = (
        <>
            <div className="sh-card-footer-text-container">
                <p className="sh-card-footer-text italic text-center text-sm">SHARZNET</p>
            </div>
        </>
    );

    return (
        <Card
            cardHeaderChildren={cardHeaderChildren}
            cardBodyChildren={cardBodyChildren}
            cardFooterChildren={cardFooterChildren}
            className={detectDevice().isDesktop ? 'w-1/4' : (detectDevice().isTablet ? 'w-3/4' : 'w-full')}
        />
    );
};

export default Login;
