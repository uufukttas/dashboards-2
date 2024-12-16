'use client';

import { Alert } from '@projects/alert';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../redux/features/alertInformation';
import { AppDispatch, RootState } from '../redux/store';
import Background from '../../src/components/Background/Background';
import Loading from '../../src/components/Loading/Loading';
import Login from '../../src/components/Login/Login';
import { BRAND_PREFIX, stylesProps } from '../../src/constants/constants';
import useCheckAuth from '../../src/hooks/useCheckAuth';
import ModalManager from '../../src/managers/Modal.manager';
import './MainClient.css';

const MainClient: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const { isReady } = useCheckAuth();

  useEffect(() => {
    if (!alertInformation.isVisible) return;

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  }, [alertInformation.isVisible]);

  if (!isReady) {
    return <Loading />;
  }

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
      {alertInformation.isVisible && (
        <Alert
          alertText={alertInformation.message}
          alertType={alertInformation.type}
          id={`${BRAND_PREFIX}-login-alert`}
        />
      )}
      <ModalManager />
      {isLoading && <Loading />}
    </>
  );
};

export default MainClient;
