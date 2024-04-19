'use client'

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { detectDevice } from '@projects/common';
import { RootState } from './redux/store';
import Background from '../src/components/Background/Background';
import Loading from '../src/components/Loading/Loading';
import Login from '../src/components/Login/Login';
import { userInfo, stylesProps } from '../src/constants/constants';
import './page.css';

const Index = () => {
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const [isDetectedDevice, setIsDetectedDevice] = useState<boolean>(false);

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  return (
    isDetectedDevice && (
      <div className={
        `${userInfo.name}-head-office w-full flex items-center justify-center bg-[${
          stylesProps.loginFormPageBackgroundColor}] ${detectDevice().isMobile ? 'h-screen': ''}`
      }>
        <Login />
        <Background
          backgroundUrl={stylesProps.loginPageBackgroundImage}
          className={detectDevice().isDesktop ? 'w-3/4' : 'hidden'}
        />
        {
          isLoading && (
            <Loading />
          )
        }
        {
          alertInformation.isVisible && (
            <Alert
              alertText={alertInformation.message}
              alertType={alertInformation.type}
              id={'sh-login-failed-alert'}
            />
          )
        }
      </div>
    )
  );
};

export default Index;
