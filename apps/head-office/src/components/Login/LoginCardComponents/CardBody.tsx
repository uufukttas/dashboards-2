import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../constants/constants';
import loginRequest from '../../../../app/api/login/loginRequests';
import { hideAlert, showAlert } from '../../../../app/redux/features/alertInformation';
import { toggleLoadingVisibility } from '../../../../app/redux/features/isLoadingVisible';
import { AppDispatch } from '../../../../app/redux/store';
import type { ILoginFormDataProps, ILoginRequestDataProps } from '../types';

const CardBody: React.FC = () => {
    const initialLoginFormData: ILoginFormDataProps = { password: '', username: '' };
    const loginFormInputs: string[] = ['username', 'password'];
    const dispatch = useDispatch<AppDispatch>();
    const { formState: { errors }, handleSubmit, register } = useForm();
    const router = useRouter();
    const [loginFormData, setLoginFormData] = useState<ILoginFormDataProps>(initialLoginFormData);

    const fetchLoginData = async (credentials: string): Promise<void> => {
        try {
            const response = await loginRequest(credentials);

            response.status === 200 ? handleLoginSuccess() : handleLoginError(response.data.message);
        } catch (error) {
            console.log(error);
        };
    };
    const getDisplayName = (type: string): string => type === loginFormInputs[0] ? 'Kullanıcı Adı' : 'Şifre';
    const handleLoginError = (message: string): void => {
        dispatch(toggleLoadingVisibility(false));
        dispatch(showAlert({ message, type: 'error', }));
        setTimeout(() => dispatch(hideAlert()), 5000);
    };
    const handleLoginSubmit = async (): Promise<void> => {
        dispatch(toggleLoadingVisibility(true));

        const userLoginData: ILoginRequestDataProps = {
            userName: loginFormData.username,
            password: loginFormData.password,
        };

        await fetchLoginData(JSON.stringify(userLoginData));
    };
    const handleLoginSuccess = (): void => {
        dispatch(toggleLoadingVisibility(true));

        router.push('/dashboards');
    };

    return (
        <div className={`${BRAND_PREFIX}-card-login-form-container`}>
            <form className={`${BRAND_PREFIX}-card-login-form`} onSubmit={handleSubmit(handleLoginSubmit)}>
                {
                    loginFormInputs.map((loginFormInput: string, index: number) => (
                        <div className={`${BRAND_PREFIX}-${loginFormInput}-input-container mb-4`} key={index} >
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
                                                    checkLength: (value: string) => value.length >= 8,
                                                    matchPattern: (value: string) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&.*-]).{8,}$/.test(value),
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
