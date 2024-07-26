'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { detectDevice } from '@projects/common';
import { getColors } from './api/profile';
import { getLanguageListRequest } from './api/login';
import { setLanguages } from './redux/features/languages';
import { setConfigs } from './redux/features/setConfig';
import { RootState } from './redux/store';
import Background from '../src/components/Background/Background';
import Loading from '../src/components/Loading/Loading';
import Login from '../src/components/Login/Login';
import { stylesProps, userInfo } from '../src/constants/constants';
import { IDropdownItemProps } from '../src/components/Login/types';
import './page.css';

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const colors = useSelector((state: RootState) => state.configs.colors);
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const languages: IDropdownItemProps[] = useSelector((state: RootState) => state.languages.languages);
  const [isDetectedDevice, setIsDetectedDevice] = useState<boolean>(false);

  const fetchConfigurations = async (): Promise<void> => {
    const colors = await getColors(["Primary", "Secondary", "Alternate", "Backup"]);

    dispatch(setConfigs(colors.data));
    setIsDetectedDevice(true);
  };
  const getLanguageList = async (): Promise<void> => {
    const languageList = await getLanguageListRequest();

    dispatch(
        setLanguages(
            languageList.map((language: IDropdownItemProps) => {
                return ({
                    id: null,
                    rid: language.id,
                    name: language.name,
                })
            })
        )
    );
};

  useEffect(() => {
    fetchConfigurations();
    getLanguageList();
  }, []);

  return (
    isDetectedDevice && (
      <div className={
        `${userInfo.name}-head-office w-full flex items-center justify-center ${detectDevice().isMobile ? 'h-screen' : ''}`
      }
        style={{ '--color-primary': `${colors[0].value}`, '--color-secondary': `${colors[1].value}` } as React.CSSProperties}
      >
        {
          languages.length > 0 && (
            <>
              <Login />
              <Background
                backgroundUrl={stylesProps.loginPageBackgroundImage}
                className={detectDevice().isDesktop ? 'w-3/4' : 'hidden'}
              />
            </>
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
              id={'sh-login-failed-alert'}
            />
          )
        }
      </div>
    )
  );
};

export default Index;
