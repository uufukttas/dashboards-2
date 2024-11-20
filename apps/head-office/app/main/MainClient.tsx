'use client';

import React, { Fragment, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Background from '../../src/components/Background/Background';
import Loading from '../../src/components/Loading/Loading';
import Login from '../../src/components/Login/Login';
import { BRAND_PREFIX, stylesProps } from '../../src/constants/constants';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './MainClient.css';
import { hideAlert } from '../redux/features/alertInformation';

const MainClient: React.FC = () => {
  const dispatch = useDispatch();
  const toastRef = useRef<Toast>(null);
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);

  useEffect(() => {
    if (!alertInformation.isVisible) return;

    toastRef?.current?.show({
      severity: alertInformation.type,
      summary: `${alertInformation.message}`,
    });
  }, [alertInformation.isVisible]);

  return (
    <>
      {
        <Fragment>
          <div className={`${BRAND_PREFIX}-main-client-component-container flex flex-col`}>
            <Login />
          </div>
          <Background backgroundUrl={stylesProps.loginPageBackgroundImage} />
        </Fragment>
      }
      {isLoading && <Loading />}
      {alertInformation.isVisible && (
        <Toast position={'top-right'} ref={toastRef} onHide={() => dispatch(hideAlert())} />
      )}
    </>
  );
};

export default MainClient;
