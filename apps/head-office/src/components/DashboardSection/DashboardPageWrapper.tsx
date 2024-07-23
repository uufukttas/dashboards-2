import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import DashboardSection from './DashboardSection';
import Loading from '../Loading/Loading';
import MainPage from '../MainPage/MainPage';
import { BRAND_PREFIX } from '../../constants/constants';
import { getColors } from '../../../app/api/profile';
import { setConfigs } from '../../../app/redux/features/setConfig';
import { RootState } from '../../../app/redux/store';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const colors = useSelector((state: RootState) => state.configs.colors);
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const checkToken = () => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      router.push('/');
    };
  };

  const fetchConfigurations = async () => {
    const colors = await getColors(["Primary", "Secondary", "Alternate", "Backup"]);
    dispatch(setConfigs(colors.data));
    setIsVisible(true);
  };

  useEffect(() => {
    checkToken();
    fetchConfigurations();
  }, []);

  return (
    isVisible &&
    <div
      className={`${montserrat.className} ${BRAND_PREFIX}-dashboards-page-wrapper w-full flex h-screen`}
      style={{
        '--color-primary': `${colors[0].value}`,
        '--color-secondary': `${colors[1].value}`
      } as React.CSSProperties}
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
