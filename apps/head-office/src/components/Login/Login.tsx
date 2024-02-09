import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Button } from "@projects/button";
import { detectDevice } from '@projects/common';
import { Image } from '@projects/image';
import { Input } from "@projects/input";
import { Label } from "@projects/label";
import Card from '../Card/Card';
import { userInfo } from '../../constants/styles';
import { toggleLoading } from '../../../app/redux/features/isLoading';

interface RequestConfig {
    headers: {
        'Content-Type': string;
    },
};

interface LoginProps {
    setLoginFailedData: (data: { isFailed: boolean, message: string }) => void;
};

const Login = ({ setLoginFailedData }: LoginProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loginFormData, setLoginFormData] = useState({ username: '', password: '' });

    const handleLoginSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        dispatch(toggleLoading(true));

        const userLoginData = JSON.stringify({
            "userName": loginFormData.username,
            "password": loginFormData.password,
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
            closeAlert();
        } else {
            dispatch(toggleLoading(false));
            setLoginFailedData({ isFailed: true, message: 'Hay aksi. Bir şeyler ters gitti!' });
            closeAlert();
        }
    };

    const fetchLoginData = async (data: string, conf: RequestConfig) => {
        try {
            const requestResponse = await axios.post(process.env.LOGIN_URL || '', data, conf);

            return requestResponse.data;
        } catch (error) {
            console.log(error);
        }
    };

    const closeAlert = () => {
        setTimeout(() => {
            setLoginFailedData({ isFailed: false, message: '' });
        }, 5000);
    };

    const cardHeaderChildren = (
        <>
            <div className="sh-card-title-container">
                <h2 className="sh-card-title-text text-2xl font-semibold">{userInfo.name}</h2>
            </div>
            <div className="sh-card-logo-container">
                <Image alt={`${userInfo.name} logo`} className="sh-card-logo" src={userInfo.logo} />
            </div>
        </>
    );
    const cardBodyChildren = (
        <>
            <div className="sh-card-form-container">
                <form className='sh-card-form'>
                    <div className="mb-4">
                        <Label
                            className={`block text-sm font-medium text-gray-600`}
                            htmlFor="username"
                            labelText="Username"
                        />
                        <Input
                            className={`mt-1 p-2 w-full border`}
                            id="username"
                            name="username"
                            type="text"
                            onChange={(e) => setLoginFormData({ ...loginFormData, username: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <Label
                            className={`block text-sm font-medium text-gray-600`}
                            htmlFor="password"
                            labelText="Password"
                        />
                        <Input
                            className={`mt-1 p-2 w-full border`}
                            id="password"
                            name="password"
                            type="password"
                            onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <Button
                            buttonText="Submit"
                            className={`sh-login-button p-2 w-full`}
                            type="submit"
                            onClick={handleLoginSubmit}
                        />
                    </div>
                </form>
            </div>
        </>
    );
    const cardFooterChildren = (
        <>
            <div className="sh-card-footer-text-container">
                <p className="sh-card-footer-text italic text-center">SHARZNET</p>
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