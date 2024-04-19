import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../constants/constants';
import { hideAlert, showAlert } from '../../../../app/redux/features/alertInformation';
import { toggleLoadingVisibility } from '../../../../app/redux/features/isLoadingVisible';
import type { ILoginFormDataProps, IRequestConfig } from '../types';

const initialLoginFormData = {
    username: '',
    password: '',
};

interface IErrorProps {
    error: {
        response: {
            status: number;
        }
    }
}
const CardBody = () => {
    const loginFormInputs = ['username', 'password'];
    const dispatch = useDispatch();
    const { formState: { errors }, register, handleSubmit } = useForm();
    const router = useRouter();
    const [loginFormData, setLoginFormData] = useState<ILoginFormDataProps>(initialLoginFormData);

    const fetchLoginData = async (data: string, config: IRequestConfig) => {
        try {
            await axios
                .post(
                    process.env.LOGIN_URL || '',
                    data,
                    config
                )
                .then((response) => response)
                .then((data) => {
                    dispatch(toggleLoadingVisibility(false));
                    console.log('data', data)
                    router.push('/dashboards');
                });
        } catch (error: unknown) {
            console.log('error', error)
            dispatch(toggleLoadingVisibility(false));
            let message = 'Bir hata oluştu. Lütfen tekrar deneyiniz.';

            if (typeof error === "object" && error !== null && "error" in error) {
                const typedError = error as IErrorProps;

                if (typedError.error && typedError.error.response) {
                    if (typedError.error.response.status > 399) {
                        message = 'Kullanıcı Adı veya Şifre Hatalı';
                    }
                }
            }

            dispatch(showAlert({
                message: message,
                type: 'error'
            }));

            setTimeout(() => {
                dispatch(hideAlert());
            }, 5000);
        }
    };
    const getDisplayName = (type: string) => type === loginFormInputs[0] ? 'Kullanıcı Adı' : 'Şifre';
    const handleLoginSubmit = async () => {
        const requestConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const userLoginData = {
            userName: loginFormData.username,
            password: loginFormData.password,
        };

        dispatch(toggleLoadingVisibility(true));

        await fetchLoginData(JSON.stringify((userLoginData)), requestConfig);
    };

    return (
        <div className={`${BRAND_PREFIX}-card-form-container`}>
            <form className={`${BRAND_PREFIX}-card-form`} onSubmit={handleSubmit(handleLoginSubmit)}>
                {
                    loginFormInputs.map((loginFormInput: string, index: number) => (
                        <div key={index} className={`${BRAND_PREFIX}-login-input-container mb-4`}>
                            <Label
                                className={`${loginFormInput}-label block text-sm font-medium text-gray-600`}
                                htmlFor={loginFormInput}
                                labelText={getDisplayName(loginFormInput)}
                            />
                            <Input
                                className={`${loginFormInput}-input mt-1 p-2 w-full border focus:ring-primary focus:border-primary rounded-lg text-text text-sm ${BRAND_PREFIX}-login-input`}
                                id={loginFormInput}
                                name={loginFormInput}
                                register={
                                    register(
                                        loginFormInput, {
                                        pattern: {
                                            message: `Geçersiz ${getDisplayName(loginFormInput)}.`,
                                            // TODO: Add pattern for username email if it need // /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                                            value: loginFormInput === loginFormInputs[0]
                                                ? /^.*$/
                                                : /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$.*])/,
                                        },
                                        required: `${getDisplayName(loginFormInput)} zorunlu bir alandır.`,
                                        validate: loginFormInput === loginFormInputs[1]
                                            ? {
                                                checkLength: (value) => value.length >= 8,
                                                matchPattern: (value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&.*-]).{8,}$/.test(value)
                                            }
                                            : {},
                                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                                            setLoginFormData({
                                                ...loginFormData,
                                                [loginFormInput.toLowerCase()]: event.target.value,
                                            });
                                        },
                                    }
                                    )
                                }
                                type={loginFormInput === loginFormInputs[1] ? loginFormInputs[1] : 'text'}
                            />
                            {errors[loginFormInput] &&
                                errors[loginFormInput]?.message &&
                                (
                                    <div className={`${loginFormInput}-error-wrapper my-4 font-bold text-error`}>
                                        <p className={`${loginFormInput}-error-message text-error`}>
                                            {(errors[loginFormInput]?.message?.toString())}
                                        </p>
                                    </div>
                                )}
                        </div>
                    ))
                }
                <div className={`${BRAND_PREFIX}-login-button-container mb-4`}>
                    <Button
                        buttonText={'Giriş Yap'}
                        className={`button bg-primary hover:bg-primary-lighter text-text font-bold py-2 px-4 focus:outline-none focus:shadow-outline ${BRAND_PREFIX}-login-button p-2 w-full`}
                        id={`${BRAND_PREFIX}-login-button`}
                        type={'submit'}
                    />
                </div>
            </form>
        </div>
    );
};

export default CardBody;
