import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardSection from './DashboardSection';
import Loading from '../Loading/Loading';
import MainPage from '../MainPage/MainPage';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';

const DashboardPage: React.FC = () => {
  const dashboardPrefix: string = `${BRAND_PREFIX}-dashboards`;
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    isVisible && (
      <div
        className={`${dashboardPrefix}-page-wrapper w-full flex h-screen`}
      >
        {
          isLoading
            ? (
              <Loading />
            )
            : (
              <MainPage headerName='Dashboards'>
                <div className={
                  `${dashboardPrefix}-page-container flex justify-center items-center flex-wrap`
                }>
                  <DashboardSection />
                </div>
              </MainPage>
            )
        }
      </div>
    )
  );
};

export default DashboardPage;
