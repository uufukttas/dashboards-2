import React from 'react';
import { detectDevice } from '@projects/common';
import HelperDashboardCards from './HelperDashboardCardContent';
import { BRAND_PREFIX, dashboardTypes } from '../../constants/constants';
import { IHelperDashboardCardComponentProps } from './types';
import './HelperDashboardSection.css';
import { useGetDashboardComponentInfoQuery } from 'apps/head-office/app/api/services/dashboard/dashboard.service';

const HelperDashboardSection: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-helper-dashboard-page-cards`;
  const isDesktop: boolean = detectDevice().isDesktop;
  const { data: helperDashboardComponentInfo } = useGetDashboardComponentInfoQuery({
    params: {
      PageCode: dashboardTypes[2],
    },
  });
  return (
    <div
      className={`${pagePrefix}-container  justify-between flex-wrap w-full h-full grid`}
      style={{
        gap: '2em',
        gridTemplateColumns: isDesktop ? 'repeat(12, 1fr)' : '',
      }}
    >
      {helperDashboardComponentInfo?.map(
        (dashboardComponentItem: IHelperDashboardCardComponentProps, index: number) => {
          return <HelperDashboardCards key={index} widget={dashboardComponentItem} />;
        }
      )}
    </div>
  );
};

export default HelperDashboardSection;
