import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SecondDashboardSection from './SecondDashboardSection';
import Loading from '../Loading/Loading';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX, dashboardTypes } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';
import { getDashboardComponentInfoRequest } from '../../../app/api/dashboards';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { IDashboardComponentInfoResponseProps } from './types';
import { setSecondDashboardComponentInfo } from '../../../app/redux/features/secondDashboardComponentInfo';

const SecondDashboardPage: React.FC = () => {
  const dashboardPrefix: string = `${BRAND_PREFIX}-second-dashboard`;
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const dispatch = useDispatch();

  const getDashboardComponentInfo = async (): Promise<void> => {
    const dashboardComponentInfo: IDashboardComponentInfoResponseProps =
      await getDashboardComponentInfoRequest(dashboardTypes[2]);

    dispatch(setSecondDashboardComponentInfo(dashboardComponentInfo.data));
  };

  useEffect(() => {
    getDashboardComponentInfo();
    dispatch(toggleLoadingVisibility(false));
  }, []);

  return (
    <div className={`${dashboardPrefix}-page-wrapper w-full flex h-screen`}>
      {
        isLoading
          ? (
            <Loading />
          )
          : (
            <MainComponent headerName='Kontrol Paneli'>
              <div className={
                `${dashboardPrefix}-page-container flex justify-center items-center flex-wrap`
              }>
                <SecondDashboardSection />
              </div>
            </MainComponent>
          )
      }
    </div>
  )
};

export default SecondDashboardPage;
