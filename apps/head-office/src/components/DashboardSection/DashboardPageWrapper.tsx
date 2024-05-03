import React, { useEffect } from 'react'
import { Montserrat} from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { BRAND_PREFIX } from '../../constants/constants';
import Loading from '../Loading/Loading';
import MainPage from '../MainPage/MainPage';
import DashboardSection from './DashboardSection';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);

  // useEffect(() => {
  //   dispatch(toggleLoadingVisibility(true));
  // }, []);

  return (
    <div className={`${montserrat.className} ${BRAND_PREFIX}-service-points-page-wrapper w-full flex h-screen`}>
      {
        isLoading
          ? (
            <Loading />
          )
          : (
            <MainPage sectionName='Dashboards'>
              <div className={`${BRAND_PREFIX}-dashboard-page-container flex justify-center items-center md:pt-12 flex-wrap`}>
                <DashboardSection />
              </div>
            </MainPage>
          )
      }
    </div>
  )
}

export default DashboardPage