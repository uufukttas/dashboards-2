import React from 'react';
import { detectDevice } from '@projects/common';
import DashboardCardContent from './DashboardCardContent';
import { BRAND_PREFIX, dashboardTypes } from '../../constants/constants';
import { useGetDashboardComponentInfoQuery } from '../../../app/api/services/dashboard/dashboard.service';
import { IDashboardCardComponentProps } from './types';
import './DashboardSection.css';

const DashboardSection: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-dashboard-page-cards`;
  const isDesktop: boolean = detectDevice().isDesktop;

  const { data: dashboardComponentInfo } = useGetDashboardComponentInfoQuery({
    params: {
      PageCode: dashboardTypes[1],
    },
  });

  return (
    <div
      className={`${pagePrefix}-container justify-between flex-wrap w-full h-full grid`}
      style={{
        gap: '2em',
        gridTemplateColumns: isDesktop ? 'repeat(12, 1fr)' : '',
      }}
    >
      {dashboardComponentInfo?.map((dashboardComponentItem: IDashboardCardComponentProps, index: number) => {
        return <DashboardCardContent key={index} widget={dashboardComponentItem} />;
      })}
    </div>
  );
};

export default DashboardSection;
