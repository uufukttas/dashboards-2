import React from 'react';
import { useSelector } from 'react-redux';
import { detectDevice } from '@projects/common';
import DashboardCardContent from './DashboardCardContent';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';
import { IDashboardCardComponentProps } from './types';
import './DashboardSection.css';

const DashboardSection: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-dashboard-page-cards`;
    const isDesktop: boolean = detectDevice().isDesktop;
    const dashboardComponentInfo = useSelector((state: RootState) => state.dashboardComponentInfo.componentInfo);

    return (
        <div
            className={`${pagePrefix}-container w-full flex justify-between flex-wrap w-full h-full grid`}
            style={{
                gap: "2em",
                gridTemplateColumns: (isDesktop ? 'repeat(12, 1fr)' : ''),
            }}
        >
            {
                dashboardComponentInfo.map((dashboardComponentItem: IDashboardCardComponentProps, index: number) => {
                    return (
                        <DashboardCardContent key={index} widget={dashboardComponentItem} />
                    );
                })
            }
        </div>
    );
};

export default DashboardSection;
