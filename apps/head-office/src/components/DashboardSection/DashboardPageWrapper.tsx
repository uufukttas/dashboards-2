import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import DashboardSection from './DashboardSection';
import Loading from '../Loading/Loading';
import MainPage from '../MainPage/MainPage';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';
import { getColors } from 'apps/head-office/app/api/profile';
import { setConfigs } from 'apps/head-office/app/redux/features/setConfig';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const colors = useSelector((state: RootState) => state.configs.colors);
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const fetchConfigurations = async () => {
    const colors = await getColors(["Primary", "Secondary", "Alternate", "Backup"]);
    dispatch(setConfigs(colors.data));
    setIsVisible(true);
  };

  useEffect(() => {
    fetchConfigurations();
  }, []);

  return (
    isVisible &&
    <div
      className={`${montserrat.className} ${BRAND_PREFIX}-dashboards-page-wrapper w-full flex h-screen`}
      style={{ '--color-primary': `${colors[0].value}`, '--color-secondary': `${colors[1].value}` } as React.CSSProperties}
    >
      {
        isLoading
          ? (
            <Loading />
          )
          : (
            <MainPage headerName='Dashboards'>
              <div className={
                `${BRAND_PREFIX}-dashboard-page-container flex justify-center items-center flex-wrap`
              }>
                <DashboardSection />
              </div>
            </MainPage>
          )
      }
    </div>
  );
};

export default DashboardPage;
