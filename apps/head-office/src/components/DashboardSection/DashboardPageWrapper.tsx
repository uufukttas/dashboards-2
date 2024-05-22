import React from 'react';
import { Montserrat} from 'next/font/google';
import { useSelector } from 'react-redux';
import DashboardSection from './DashboardSection';
import Loading from '../Loading/Loading';
import MainPage from '../MainPage/MainPage';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const DashboardPage: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);

  return (
    <div className={`${montserrat.className} ${BRAND_PREFIX}-dashboards-page-wrapper w-full flex h-screen`}>
      {
        isLoading
          ? (
            <Loading />
          )
          : (
            <MainPage sectionName='Dashboards'>
              <div className={`${
                BRAND_PREFIX}-dashboard-page-container flex justify-center items-center md:pt-12 flex-wrap
                `}>
                <DashboardSection />
              </div>
            </MainPage>
          )
      }
    </div>
  );
};

export default DashboardPage;
