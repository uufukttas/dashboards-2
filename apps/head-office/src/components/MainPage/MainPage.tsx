'use client';

import { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Sidebar from '../Sidebar/Sidebar';
import { BRAND_PREFIX } from '../../constants/constants';
import { getColors } from '../../../app/api/profile';
import { setConfigs } from '../../../app/redux/features/setConfig';
import { RootState } from '../../../app/redux/store';
import type { IMainPageProps } from './types';
import './MainPage.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const MainPage: React.FC<IMainPageProps> = ({ children, headerName }: IMainPageProps) => {
  const pagePrefix: string = `${BRAND_PREFIX}-main-page`;
  const dispatch = useDispatch();
  const router = useRouter();
  const colors = useSelector((state: RootState) => state.configs.colors);
  const [isVisibleComponent, setIsVisibleComponent] = useState<boolean>(false);

  const fetchConfigurations = async (): Promise<void> => {
    const colors = await getColors(["Primary", "Secondary", "Alternate", "Backup"]);

    dispatch(setConfigs(colors.data));
    setIsVisibleComponent(true);
  };

  const checkToken = (): void => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      router.push('/');
    };
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    fetchConfigurations();
  }, [isVisibleComponent]);

  return (
    isVisibleComponent && (
      <div
        className={`${montserrat.className} ${pagePrefix}-wrapper w-full flex`}
        style={{ '--color-primary': `${colors[0].value}`, '--color-secondary': `${colors[1].value}` } as React.CSSProperties}
      >
        <Sidebar />
        <div className={`${pagePrefix}-container bg-white overflow-x-hidden no-scrollbar`}>
          <Header className={`h-[80px] flex items-center w-full bg-white`} headerName={headerName} />
          <Section>
            {children}
          </Section>
        </div>
      </div>
    )
  );
};

export default MainPage;
