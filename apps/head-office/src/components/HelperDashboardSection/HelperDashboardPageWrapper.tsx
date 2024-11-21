import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import MainComponent from '../MainComponent/MainComponent';
import HelperDashboardSection from './HelperDashboardSection';

const HelperDashboardPageWrapper: React.FC = () => {
  const dashboardPrefix: string = `${BRAND_PREFIX}-helper-dashboard`;

  return (
    <div className={`${dashboardPrefix}-page-wrapper w-full flex h-screen`}>
      <MainComponent headerName="Gösterge Paneli">
        <div className={`${dashboardPrefix}-page-container flex justify-center items-center flex-wrap w-full`}>
          <HelperDashboardSection />
        </div>
      </MainComponent>
    </div>
  );
};

export default HelperDashboardPageWrapper;
