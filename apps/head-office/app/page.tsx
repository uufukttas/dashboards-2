'use client'

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { detectDevice } from '@projects/common';
import { RootState } from './redux/store';
import Background from '../src/components/Background/Background';
import Loading from '../src/components/Loading/Loading';
import Login from '../src/components/Login/Login';
import { stylesProp } from '../src/constants/styles';
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
      <div className={`sharz-site w-full flex items-center justify-center bg-[#54565A33]`}>
        <Login />
        <Background
          backgroundUrl={stylesProp.loginPageBackgroundImage}
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
