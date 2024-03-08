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

interface ILoginFailedData {
  isFailed: boolean;
  message: string;
};

const Index = () => {
  const isLoading = useSelector((state: RootState) => state.loadingReducer.isLoading);
  const [isDetectedDevice, setIsDetectedDevice] = useState<boolean>(false);
  const [loginFailedData, setLoginFailedData] = useState<ILoginFailedData>({ isFailed: false, message: '' });

  const closeAlert = () => {
    setLoginFailedData({ isFailed: false, message: '' });
  };

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  return (
    isDetectedDevice &&
    <div className={`sharz-site w-full flex items-center justify-center h-screen bg-[#54565A33]`}>
      <Login
        closeAlert={closeAlert}
        setLoginFailedData={setLoginFailedData}
      />
      <Background
        backgroundUrl={stylesProp.loginPageBackgroundImage}
        className={detectDevice().isDesktop ? 'w-3/4' : 'hidden'}
      />
      {
        isLoading &&
          <Loading />
      }
      {
        loginFailedData.isFailed && 
          <Alert
            alertText={loginFailedData.message}
            alertType={'success'}
            id={'login-failed-alert'}
            onClick={closeAlert}
          />
      }
    </div>
  );
};

export default Index;
