'use client'

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { detectDevice } from '@projects/common';
import Background from '../src/components/Background/Background';
import Loading from '../src/components/Loading/Loading';
import Login from '../src/components/Login/Login';
import { RootState } from './redux/store';
import { stylesProp } from '../src/constants/styles';
import './page.css';

const Index = () => {
  const [isDetectedDevice, setIsDetectedDevice] = useState(false);
  const [loginFailedData, setLoginFailed] = useState({ isFailed: false, message: '' });
  const isLoading = useSelector((state: RootState) => state.loadingReducer.isLoading);

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  return (
    isDetectedDevice &&
    <div className={`w-full flex items-center justify-center h-screen bg-[#54565A33]`}>
      <Login setLoginFailedData={setLoginFailed} />
      <Background
        className={detectDevice().isDesktop ? 'w-3/4' : 'hidden'}
        backgroundUrl={stylesProp.loginPageBackgroundImage}
      />
      {isLoading && (<Loading />)}
      {loginFailedData.isFailed && (<Alert alertText={loginFailedData.message} />)}
    </div>
  );
};

export default Index;
