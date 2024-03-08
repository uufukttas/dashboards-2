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
import { AppDispatch } from '../../../app/redux/store';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';

interface ILoginFailedDataProps {
    isFailed: boolean;
    message: string;
};
interface ILoginFormDataProps {
    username: string;
    password: string;
};
interface ILoginProps {
    closeAlert: () => void;
    setLoginFailedData: (loginFailedDataProps: ILoginFailedDataProps) => void;
};
interface IRequestConfig {
    headers: {
        'Content-Type': string;
    };
};

const initialLoginFormData = {
    username: '',
    password: '',
};

const Login = ({ closeAlert, setLoginFailedData }: ILoginProps) => {
    const loginFormInputs = ['Username', 'Password'];
    const [loginFormData, setLoginFormData] = useState<ILoginFormDataProps>(initialLoginFormData);
    const dispatch = useDispatch<AppDispatch>();
    const { formState: { errors }, register, handleSubmit } = useForm();
    const router = useRouter();

    const fetchLoginData = async (data: string, config: IRequestConfig) => {
        try {
            await axios.post(
                process.env.LOGIN_URL || '',
                data,
                config
            ).then((response) => {
                return response.data;
            }).then((data) => {
                if (data.statusCode !== 200) {
                    dispatch(toggleLoadingVisibility(false));
                    setLoginFailedData({
                        isFailed: true,
                        message: data.statusCode === 500 ? 'Hay aksi bir şeyler ters gitti...' : data.value.message,
                    });
                    setTimeout(() => {
                        closeAlert();
                    }, 5000);

                    return;
                }

                dispatch(toggleLoadingVisibility(false));

                router.push('/dashboards');
            }).catch((error) => {
                console.log(error);
            });
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
                    <h2 className={`${BRAND_PREFIX}-card-title text-2xl font-semibold`}>{userInfo.name}</h2>
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
                                    className={`${loginFormInput.toLowerCase()}-label block text-sm font-medium text-gray-600`}
                                    htmlFor={loginFormInput.toLowerCase()}
                                    labelText={loginFormInput === 'Username' ? 'Kullanıcı Adı' : 'Şifre'}
                                />
                                <Input
                                    className={`${loginFormInput.toLowerCase()}-input mt-1 p-2 w-full border`}
                                    id={loginFormInput.toLowerCase()}
                                    name={loginFormInput.toLowerCase()}
                                    register={
                                        register(loginFormInput.toLowerCase(), {
                                            pattern: {
                                                message: `Geçersiz ${loginFormInput}. girişi.`,
                                                // TODO: Add pattern for username email if it need // /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                                                value: loginFormInput.toLowerCase() === 'username'
                                                    ? /^.*$/
                                                    : /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$.*])/,
                                            },
                                            required: `${loginFormInput === 'Username'
                                                ? 'Kullanıcı Adı'
                                                : 'Şifre'} zorunlu bir alandır.`,
                                            validate: loginFormInput.toLowerCase() === 'password'
                                                ? {
                                                    checkLength: (value) => value.length >= 8,
                                                    matchPattern: (value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&.*-]).{8,}$/.test(value),
                                                }
                                                : {},
                                            onChange: (event: React.ChangeEvent<HTMLInputElement>) => setLoginFormData({
                                                ...loginFormData,
                                                [loginFormInput.toLowerCase()]: event.target.value,
                                            }),
                                        })}
                                    type={loginFormInput.toLowerCase() === 'password' ? 'password' : 'text'}
                                />
                                {errors[loginFormInput.toLowerCase()] &&
                                    errors[loginFormInput.toLowerCase()]?.message &&
                                    (
                                        <div className={`${loginFormInput.toLowerCase()}-error-wrapper my-4 font-bold text-error`}>
                                            <p className={`${loginFormInput.toLowerCase()}-error-message`}>
                                                {(errors[loginFormInput.toLowerCase()]?.message?.toString())}
                                            </p>
                                        </div>
                                    )}
                            </div>
                        ))
                    }
                    <div className="mb-4">
                        <Button
                            buttonText={'Giriş Yap'}
                            className={`button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline ${BRAND_PREFIX}-login-button p-2 w-full`}
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
                <p className={`${BRAND_PREFIX}-card-footer-text italic text-center text-sm`}>SHARZNET</p>
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
