import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HelperDashboardSection from './HelperDashboardSection';
import Loading from '../Loading/Loading';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX, dashboardTypes } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';
import { getDashboardComponentInfoRequest } from '../../../app/api/dashboards';
import { setHelperDashboardComponentInfo } from '../../../app/redux/features/helperDashboardComponentInfo';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { IDashboardComponentInfoResponseProps } from './types';

const HelperDashboardPageWrapper: React.FC = () => {
  const dashboardPrefix: string = `${BRAND_PREFIX}-helper-dashboard`;
  const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
  const dispatch = useDispatch();

  const getDashboardComponentInfo = async (): Promise<void> => {
    const dashboardComponentInfo: IDashboardComponentInfoResponseProps =
      await getDashboardComponentInfoRequest(dashboardTypes[2]);

    dispatch(setHelperDashboardComponentInfo(dashboardComponentInfo.data));
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
                `${dashboardPrefix}-page-container flex justify-center items-center flex-wrap w-full`
              }>
                <HelperDashboardSection />
              </div>
            </MainComponent>
          )
      }
    </div>
  )
};

export default HelperDashboardPageWrapper;
