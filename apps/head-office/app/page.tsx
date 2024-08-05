'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { detectDevice } from '@projects/common';
import { getLanguageListRequest } from './api/login';
import { getColors } from './api/profile';
import { setLanguages } from './redux/features/languages';
import { setConfigs } from './redux/features/setConfig';
import { RootState } from './redux/store';
import Background from '../src/components/Background/Background';
import Loading from '../src/components/Loading/Loading';
import Login from '../src/components/Login/Login';
import { BRAND_PREFIX, stylesProps, userInfo } from '../src/constants/constants';
import './page.css';

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const { alertInformation, configs: { colors }, isLoadingVisible: { isLoading }, languages: { languages } } =
    useSelector((state: RootState) => state);
  const [isDetectedDevice, setIsDetectedDevice] = useState<boolean>(false);

  const fetchConfigurations = async (): Promise<void> => {
    const colors = await getColors(["Primary", "Secondary", "Alternate", "Backup"]);

    dispatch(setConfigs(colors.data));
    setIsDetectedDevice(true);
  };
  const getLanguageList = async (): Promise<void> => {
    const languageList = await getLanguageListRequest();

    const updatedLanguages = languageList.map((language: { name: string; rid: number }) => ({
      id: null,
      name: language.name,
      rid: language.rid,
    }));

    dispatch(setLanguages(updatedLanguages));
  };

  useEffect(() => {
    fetchConfigurations();
    getLanguageList();
  }, []);

  return (
    isDetectedDevice && (
      <div
        className={`${userInfo.name}-head-office w-full flex items-center justify-center ${detectDevice().isMobile ? 'h-screen' : ''}`}
        style={{
          '--color-primary': `${colors[0].value || stylesProps.primaryColor}`,
          '--color-secondary': `${colors[1].value || stylesProps.secondaryColor}`
        } as React.CSSProperties}
      >
        {
          languages.length > 0 && (
            <Fragment>
              <Login />
              <Background
                backgroundUrl={stylesProps.loginPageBackgroundImage}
                className={detectDevice().isDesktop ? 'w-3/4' : 'hidden'}
              />
            </Fragment>
          )
        }
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
              id={`${BRAND_PREFIX}-login-failed-alert`}
            />
          )
        }
      </div>
    )
  );
};

export default Index;
