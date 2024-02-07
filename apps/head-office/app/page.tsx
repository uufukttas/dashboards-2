'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { Alert } from '@projects/alert';
import { Button } from "@projects/button";
import { detectDevice } from '@projects/common'
import { Image } from '@projects/image';
import { Input } from "@projects/input";
import { Label } from "@projects/label";
import Background from '../src/components/Background/Background';
import Card from '../src/components/Card/Card';
import { userInfo, stylesProp } from '../src/constants/styles'
import './page.css';

interface RequestConfig {
  headers: {
    'Content-Type': string;
  }
}

const Index = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isDetectedDevice, setIsDetectedDevice] = useState(false);
  const [loginFailed, setLoginFailed] = useState({
    isFailed: false,
    message: ''
  });
  const router = useRouter();

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const userData = JSON.stringify({
      "userName": formData.username,
      "password": formData.password,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetchData(userData, config);

    if (res.statusCode === 200) {
      setTimeout(() => {
        router.push('/dashboards');
      }, 750);
    } else if (res.statusCode === 401) {
      setLoginFailed({ isFailed: true, message: res.value.message });
    }
  }


  const fetchData = async (data: string, conf: RequestConfig) => {
    try {
      const res = await axios.post(process.env.LOGIN_URL || '', data, conf)

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const cardHeaderChildren = (
    <>
      <div className="sh-card-title-container">
        <h2 className="sh-card-title-text text-2xl font-semibold mb-6">{userInfo.name}</h2>
      </div>
      <div className="sh-card-logo-container">
        <Image alt={`${userInfo.name} logo`} className="sh-card-logo" src={userInfo.logo} />
      </div>
    </>);
  const cardBodyChildren = (
    <div className="sh-card-form-container">
      <form className="sh-card-form-container">
        <div className="mb-4">
          <Label
            className="block text-sm font-medium text-gray-600"
            htmlFor="username"
            labelText="Username"
          />
          <Input
            className={`mt-1 p-2 w-full border`}
            id="username"
            name="username"
            type="text"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <Label
            className="block text-sm font-medium text-gray-600"
            htmlFor="password"
            labelText="Password"
          />
          <Input
            className={`mt-1 p-2 w-full border`}
            id="password"
            name="password"
            type="password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="button-container">
          <Button
            buttonText="Submit"
            className={`sh-login-button p-2 w-full`}
            type="submit"
            onClick={handleClick}
          />
        </div>
      </form>
    </div>
  );
  const cardFooterChildren = (
    <div className="sh-card-footer-text-container">
      <p className="sh-card-footer-text italic text-center">SHARZNET</p>
    </div>
  );

  return (
    isDetectedDevice &&
    <div className={`w-full flex items-center justify-center h-screen bg-[#54565a33]`}>
      <Card
        cardHeaderChildren={cardHeaderChildren}
        cardBodyChildren={cardBodyChildren}
        cardFooterChildren={cardFooterChildren}
        className={detectDevice().isDesktop ? 'w-1/4' : (detectDevice().isTablet ? 'w-3/4' : 'w-full')}
        onClick={handleClick}
      />
      <Background
        className={detectDevice().isDesktop ? 'w-3/4' : 'hidden'}
        backgroundUrl={stylesProp.loginPageBackgroundImage}
      />
      {loginFailed.isFailed && <Alert alertText={loginFailed.message} />}
    </div>
  );
};

export default Index;
