import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import CardBodyFormElement from './FormElement';
import { BRAND_PREFIX } from '../../../constants/constants';
import loginRequest from '../../../../app/api/login/loginRequests';
import { hideAlert, showAlert } from '../../../../app/redux/features/alertInformation';
import { toggleLoadingVisibility } from '../../../../app/redux/features/isLoadingVisible';
import { setLoginToken } from '../../../../app/redux/features/loginToken';
import { AppDispatch } from '../../../../app/redux/store';
import type { ILoginFormDataProps, ILoginRequestDataProps } from '../types';

const CardBody: React.FC = () => {
    const initialLoginFormData: ILoginFormDataProps = { password: '', username: '' };
    const loginFormInputs: string[] = ['username', 'password'];
    const loginPrefix: string = `${BRAND_PREFIX}-login`;
    const dispatch = useDispatch<AppDispatch>();
    const { formState: { errors }, handleSubmit, register } = useForm();
    const router = useRouter();
    const [loginFormData, setLoginFormData] = useState<ILoginFormDataProps>(initialLoginFormData);

    const fetchLoginData = async (credentials: ILoginRequestDataProps): Promise<void> => {
        const response = await loginRequest(credentials);

        dispatch(setLoginToken(response?.token?.result));

        window.localStorage.setItem('token', decodeURIComponent(response.token.result));
        response.status === 200 ? handleLoginSuccess() : handleLoginError(response.data.message);
    };
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

        await fetchLoginData(userLoginData);
    };
    const handleLoginSuccess = (): void => {
        dispatch(toggleLoadingVisibility(true));

        router.push('/dashboards');
    };

    return (
        <div className={`${loginPrefix}-form-container`}>
            <form className={`${loginPrefix}-form`} onSubmit={handleSubmit(handleLoginSubmit)}>
                {
                    loginFormInputs.map((loginFormInput: string, index: number) => (
                        <CardBodyFormElement
                            errors={errors}
                            index={index}
                            key={index}
                            loginFormData={loginFormData}
                            loginFormInput={loginFormInput}
                            register={register}
                            setLoginFormData={setLoginFormData}
                        />
                    ))
                }
                <div className={`${loginPrefix}-submit-button-container mb-4`}>
                    <Button
                        buttonText={'Giriş Yap'}
                        className={`${loginPrefix}-submit-button bg-primary hover:bg-primary-lighter text-text font-bold py-2 px-4 focus:outline-none focus:shadow-outline ${loginPrefix}-button p-2 w-full`}
                        id={`${loginPrefix}-submit-button`}
                        type={'submit'}
                    />
                </div>
            </form>
        </div>
    );
};

export default CardBody;
