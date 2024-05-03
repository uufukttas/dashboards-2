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
import type { IHeaderProps, ILoginFormDataProps, ILoginRequestDataProps, IResponseErrorProps } from '../types';

const CardBody: React.FC = () => {
    const initialLoginFormData: ILoginFormDataProps = { password: '', username: '' };
    const loginFormInputs: string[] = ['username', 'password'];
    const dispatch = useDispatch();
    const { formState: { errors }, handleSubmit, register } = useForm();
    const router = useRouter();
    const [loginFormData, setLoginFormData] = useState<ILoginFormDataProps>(initialLoginFormData);

    const fetchLoginData = async (data: string): Promise<void> => {
        const requestHeaders: IHeaderProps = { headers: { 'Content-Type': 'application/json' } };

        try {
            await axios
                .post(
                    process.env.LOGIN_URL || '',
                    data,
                    requestHeaders
                )
                .then(handleLoginSuccess)
                .catch((error) => handleLoginError(error));
        } catch (error) {
            console.log(error);
        };
    };
    const getDisplayName = (type: string): string => type === loginFormInputs[0] ? 'Kullanıcı Adı' : 'Şifre';
    const handleLoginSubmit = async (): Promise<void> => {
        const userLoginData: ILoginRequestDataProps = {
            userName: loginFormData.username,
            password: loginFormData.password,
        };

        dispatch(toggleLoadingVisibility(true));

        await fetchLoginData(JSON.stringify(userLoginData));
    };
    const handleLoginError = (error: IResponseErrorProps): void => {
        const errorMessage: string = error.response.status > 399 && error.response.status < 500
            ? 'Kullanıcı adı veya şifre hatalı.'
            : 'Bir hata oluştu. Lütfen tekrar deneyin.';

        dispatch(toggleLoadingVisibility(false));
        dispatch(showAlert({ message: errorMessage, type: 'error' }));
        setTimeout(() => dispatch(hideAlert()), 5000);
    };
    const handleLoginSuccess = (): void => {
        dispatch(toggleLoadingVisibility(false));

        router.push('/dashboards');
    };

    return (
        <div className={`${BRAND_PREFIX}-card-login-form-container`}>
            <form className={`${BRAND_PREFIX}-card-login-form`} onSubmit={handleSubmit(handleLoginSubmit)}>
                {
                    loginFormInputs.map((loginFormInput: string, index: number) => (
                        <div key={index} className={`${BRAND_PREFIX}-${loginFormInput}-input-container mb-4`}>
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
                            {
                                errors[loginFormInput] &&
                                errors[loginFormInput]?.message && (
                                    <div className={`${loginFormInput}-error-wrapper my-4 font-bold text-error`}>
                                        <p className={`${loginFormInput}-error-message text-error`}>
                                            {(errors[loginFormInput]?.message?.toString())}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
                <div className={`${BRAND_PREFIX}-login-button-container mb-4`}>
                    <Button
                        buttonText={'Giriş Yap'}
                        className={`bg-primary hover:bg-primary-lighter text-text font-bold py-2 px-4 focus:outline-none focus:shadow-outline ${BRAND_PREFIX}-login-button p-2 w-full`}
                        id={`${BRAND_PREFIX}-login-button`}
                        type={'submit'}
                    />
                </div>
            </form>
        </div>
    );
};

export default CardBody;
