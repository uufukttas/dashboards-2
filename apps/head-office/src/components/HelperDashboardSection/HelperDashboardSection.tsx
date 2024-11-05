import React from 'react';
import { useSelector } from 'react-redux';
import { detectDevice } from '@projects/common';
import HelperDashboardCards from './HelperDashboardCardContent';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';
import { IHelperDashboardCardComponentProps } from './types';
import './HelperDashboardSection.css';

const HelperDashboardSection: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-helper-dashboard-page-cards`;
    const isDesktop: boolean = detectDevice().isDesktop;
    const helperDashboardComponentInfo = useSelector((state: RootState) => state.helperDashboardComponentInfo.componentInfo);

    return (
        <div
            className={`${pagePrefix}-container w-full flex justify-between flex-wrap w-full h-full grid`}
            style={{
                gap: "2em",
                gridTemplateColumns: (isDesktop ? 'repeat(12, 1fr)' : ''),
            }}
        >
            {
                helperDashboardComponentInfo.map((dashboardComponentItem: IHelperDashboardCardComponentProps, index: number) => {
                    return (
                        <HelperDashboardCards
                            key={index}
                            widget={dashboardComponentItem}
                        />
                    );
                })
            }
        </div>
    );
};

export default HelperDashboardSection;
