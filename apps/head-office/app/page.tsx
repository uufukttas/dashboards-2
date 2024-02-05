'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { detectDevice } from '@projects/common'
import { Button } from "@projects/button";
import { Input } from "@projects/input";
import { Image } from '@projects/image';
import { Label } from "@projects/label";
import Background from '../src/components/Background/Background';
import Card from '../src/components/Card/Card';
import { userInfo, stylesProp } from '../src/constants/styles'
import './page.css';

const Index = () => {
  const [isDetectedDevice, setIsDetectedDevice] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    router.push('/dashboards')
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
    <div className={`w-full flex items-center h-screen`}>
      <Card 
        cardHeaderChildren={cardHeaderChildren}
        cardBodyChildren={cardBodyChildren}
        cardFooterChildren={cardFooterChildren}
        className={detectDevice().isDesktop ? 'w-1/4' : 'w-full'}
        onClick={handleClick}
      />
      <Background
        className={detectDevice().isDesktop ? 'w-3/4' : 'hidden'}
        backgroundUrl={stylesProp.loginPageBackgroundImage}
      />
    </div>
  );
};

export default Index;
