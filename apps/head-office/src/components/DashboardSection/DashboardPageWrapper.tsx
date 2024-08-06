import React from 'react';
import { useSelector } from 'react-redux';
import DashboardSection from './DashboardSection';
import Loading from '../Loading/Loading';
import MainPage from '../MainPage/MainPage';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';

const DashboardPage: React.FC = () => {
  const dashboardPrefix: string = `${BRAND_PREFIX}-dashboards`;
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);

  return (
    <div className={`${dashboardPrefix}-page-wrapper w-full flex h-screen`}>
      {
        isLoading
          ? (
            <Loading />
          )
          : (
            <MainPage headerName='Kontrol Paneli'>
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
};

export default DashboardPage;
