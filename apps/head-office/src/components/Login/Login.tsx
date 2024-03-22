import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { detectDevice } from '@projects/common';
import { Image } from '@projects/image';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import Card from '../Card/Card';
import { BRAND_PREFIX } from '../../constants/constants';
import { userInfo } from '../../constants/styles';
import { showAlert, hideAlert } from '../../../app/redux/features/alertInformation';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { AppDispatch } from '../../../app/redux/store';

interface ILoginFormDataProps {
    username: string;
    password: string;
};
interface IRequestConfig {
    headers: { 'Content-Type': string; };
};

const initialLoginFormData = {
    username: '',
    password: '',
};

const Login = () => {
    const loginFormInputs = ['username', 'password'];
    const dispatch = useDispatch<AppDispatch>();
    const { formState: { errors }, register, handleSubmit } = useForm();
    const router = useRouter();
    const [loginFormData, setLoginFormData] = useState<ILoginFormDataProps>(initialLoginFormData);

    const getDisplayName = (type: string) => type === loginFormInputs[0] ? 'Kullanıcı Adı' : 'Şifre';
    const fetchLoginData = async (data: string, config: IRequestConfig) => {
        try {
            await axios
                .post(
                    process.env.LOGIN_URL || '',
                    data,
                    config
                )
                .then((response) => response.data)
                .then((data) => {
                    if (data.statusCode !== 200) {
                        dispatch(toggleLoadingVisibility(false));
                        dispatch(showAlert({
                            message: data.value.message,
                            type: 'error'
                        }));

                        setTimeout(() => {
                            dispatch(hideAlert());
                        }, 5000);

                        return;
                    };

                    dispatch(toggleLoadingVisibility(false));

                    router.push('/dashboards');
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    };
    const handleLoginSubmit = async () => {
        const userLoginData = {
            'userName': loginFormData.username,
            'password': loginFormData.password,
        };
        const requestConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        dispatch(toggleLoadingVisibility(true));

        await fetchLoginData(JSON.stringify((userLoginData)), requestConfig);
    };

    const cardHeaderChildren = (
        <>
            <div className={`${BRAND_PREFIX}-card-header-container`}>
                <div className={`${BRAND_PREFIX}-card-title-container`}>
                    <h2 className={`${BRAND_PREFIX}-card-title text-2xl font-semibold text-heading`}>
                        {userInfo.name}
                    </h2>
                </div>
            </div>
            <div className={`${BRAND_PREFIX}-card-logo-container`}>
                <Image
                    alt={`${userInfo.name} logo`}
                    className={`${BRAND_PREFIX}-card-logo`}
                    height={100}
                    src={userInfo.logo}
                    width={100}
                />
            </div>
        </>
    );
    const cardBodyChildren = (
        <>
            <div className={`${BRAND_PREFIX}-card-form-container`}>
                <form className={`${BRAND_PREFIX}-card-form`} onSubmit={handleSubmit(handleLoginSubmit)}>
                    {
                        loginFormInputs.map((loginFormInput: string, index: number) => (
                            <div key={index} className="mb-4">
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
                                        register(loginFormInput, {
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
                                                    matchPattern: (value) => {
                                                        return (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&.*-]).{8,}$/
                                                            .test(value));
                                                    },
                                                }
                                                : {},
                                            onChange: (event: React.ChangeEvent<HTMLInputElement>) => setLoginFormData({
                                                ...loginFormData,
                                                [loginFormInput.toLowerCase()]: event.target.value,
                                            }),
                                        })}
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
                    <div className="mb-4">
                        <Button
                            buttonText={'Giriş Yap'}
                            className={`button bg-primary hover:bg-primary-lighter text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline ${BRAND_PREFIX}-login-button p-2 w-full`}
                            type={'submit'}
                        />
                    </div>
                </form>
            </div>
        </>
    );
    const cardFooterChildren = (
        <>
            <div className={`${BRAND_PREFIX}-card-footer-text-container`}>
                <p className={`${BRAND_PREFIX}-card-footer-text italic text-center text-sm text-text`}>SHARZNET</p>
            </div>
        </>
    );
    const cardContent = {
        header: cardHeaderChildren,
        body: cardBodyChildren,
        footer: cardFooterChildren,
    };

    return (
        <Card
            cardContent={cardContent}
            className={detectDevice().isDesktop ? 'w-1/4' : (detectDevice().isTablet ? 'w-3/4' : 'w-full')}
        />
    );
};

export default Login;
