'use client';

import { Montserrat } from 'next/font/google';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Toast } from 'primereact/toast';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebarExpanded } from '../../../app/redux/features/isSidebarExpand';
import { RootState } from '../../../app/redux/store';
import { BRAND_PREFIX } from '../../constants/constants';
import useThemeColors from '../../hooks/useThemeColors';
import ModalManager from '../../managers/Modal.manager';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Sidebar from '../Sidebar/Sidebar';
import './MainComponent.css';
import type { IMainPageProps } from './types';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const MainComponent: React.FC<IMainPageProps> = ({ children, headerName }: IMainPageProps) => {
  const pagePrefix: string = `${BRAND_PREFIX}-main-page`;
  const dispatch = useDispatch();
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const toastRef = useRef<Toast>(null);

  useThemeColors();

  useEffect(() => {
    if (!alertInformation.isVisible) return;

    toastRef?.current?.show({
      severity: alertInformation.type,
      summary: `${alertInformation.message}`,
    });
  }, [alertInformation.isVisible]);

  useEffect(() => {
    dispatch(toggleSidebarExpanded(false));
  }, []);

  return (
    <div className={`${montserrat.className} ${pagePrefix}-wrapper w-full flex`}>
      {alertInformation.isVisible && <Toast position={'top-right'} ref={toastRef} />}
      <Sidebar />
      <div className={`${pagePrefix}-container bg-white`}>
        <Header className={`h-[80px] flex items-center w-full bg-white`} headerName={headerName} />
        <Section>{children}</Section>
        <Footer className={`flex items-center w-full bg-white`} />
      </div>
      <ModalManager />
    </div>
  );
};

export default MainComponent;
