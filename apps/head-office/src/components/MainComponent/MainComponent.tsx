'use client';

import { useEffect, useRef } from 'react';
import { Montserrat } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Sidebar from '../Sidebar/Sidebar';
import { BRAND_PREFIX } from '../../constants/constants';
import {
  getCityRequest,
  getDistrictsRequest,
} from '../../../app/api/servicePoints';
import { toggleSidebarExpanded } from '../../../app/redux/features/isSidebarExpand';
import { setCities, setDistricts } from '../../../app/redux/features/setCityInformation';
import { RootState } from '../../../app/redux/store';
import type { IMainPageProps } from './types';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './MainComponent.css';
import { Toast } from 'primereact/toast';
import useThemeColors from '../../hooks/useThemeColors';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const MainComponent: React.FC<IMainPageProps> = ({
  children,
  headerName,
}: IMainPageProps) => {
  const pagePrefix: string = `${BRAND_PREFIX}-main-page`;
  const dispatch = useDispatch();
  const alertInformation = useSelector(
    (state: RootState) => state.alertInformation
  );
  const toastRef = useRef<Toast>(null);
  useThemeColors();
  const setCitiesData = async (): Promise<void> => {
    const cities = await getCityRequest();

    dispatch(setCities(cities));
  };
  const setDistritcsData = async (): Promise<void> => {
    const distritcs = await getDistrictsRequest(1);

    dispatch(setDistricts(distritcs));
  };

  useEffect(() => {
    if (!alertInformation.isVisible) return;

    toastRef?.current?.show({
      severity: alertInformation.type,
      summary: `${alertInformation.message}`,
    });
  }, [alertInformation.isVisible]);

  useEffect(() => {
    setCitiesData();
    setDistritcsData();
    dispatch(toggleSidebarExpanded(false));
  }, []);

  return (
    (
      <div
        className={`${montserrat.className} ${pagePrefix}-wrapper w-full flex`}
      >
        {alertInformation.isVisible && (
          <Toast position={'top-right'} ref={toastRef} />
        )}
        <Sidebar />
        <div className={`${pagePrefix}-container bg-white`}>
          <Header
            className={`h-[80px] flex items-center w-full bg-white`}
            headerName={headerName}
          />
          <Section>{children}</Section>
          <Footer className={`flex items-center w-full bg-white`} />
        </div>
      </div>
    )
  );
};

export default MainComponent;
