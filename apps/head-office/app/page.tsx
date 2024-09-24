'use client';

import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { detectDevice } from '@projects/common';
import { getLanguageListRequest } from './api/login';
import { getColorsRequest } from './api/profile';
import { setLanguages } from './redux/features/languages';
import { setConfigs } from './redux/features/setConfig';
import { RootState } from './redux/store';
import Background from '../src/components/Background/Background';
import Loading from '../src/components/Loading/Loading';
import Login from '../src/components/Login/Login';
import { stylesProps, userInfo } from '../src/constants/constants';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './page.css';

interface ILanguageProps {
  name: string;
  rid: number;
};

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const toastRef = useRef<Toast>(null);
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const colors = useSelector((state: RootState) => state.configs.colors);
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const languages = useSelector((state: RootState) => state.languages.languages);
  const [isDetectedDevice, setIsDetectedDevice] = useState<boolean>(false);

  const fetchColors = async (): Promise<void> => {
    const colors = await getColorsRequest(["Primary", "Secondary", "Alternate", "Backup"]);

    dispatch(setConfigs(colors.data));
    setIsDetectedDevice(true);
  };
  const getLanguageList = async (): Promise<void> => {
    const languageList = await getLanguageListRequest();

    const updatedLanguages = languageList.map((language: ILanguageProps) => ({
      id: null,
      name: language.name,
      rid: language.rid,
    }));

    dispatch(setLanguages(updatedLanguages));
  };

  useEffect(() => {
    fetchColors();
    getLanguageList();
  }, []);

  useEffect(() => {
    if (!alertInformation.isVisible) return;

    toastRef?.current?.show({
      severity: alertInformation.type,
      summary: `${alertInformation.message}`
    });

  }, [alertInformation.isVisible]);

  return (
    isDetectedDevice && (
      <div
        className={`${userInfo.name}-head-office w-full flex items-center justify-center ${detectDevice().isMobile ? 'h-screen' : ''}`}
        style={{
          '--primary-color': `${colors[0].value || stylesProps.primaryColor}`,
          '--secondary-color': `${colors[1].value || stylesProps.secondaryColor}`
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
            <Toast ref={toastRef} />
          )
        }
      </div>
    )
  );
};

export default Index;
