import React from 'react';
import { useSelector } from 'react-redux';
import { detectDevice } from '@projects/common';
import DashboardCardContent from './DashboardCardContent';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';
import { IDashboardCardComponentProps } from './types';
import './DashboardSection.css';

const DashboardCards: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-dashboard-page-cards`;
    const isDesktop = detectDevice().isDesktop;
    const dashboardComponentInfo = useSelector((state: RootState) => state.dashboardComponentInfo.componentInfo);

    return (
        <div className={`${pagePrefix}-container w-full flex justify-between flex-wrap`}>
            <div
                className={`${pagePrefix}-card-container w-full h-full grid`}
                style={{
                    gap: "2em",
                    gridTemplateColumns: (isDesktop ? 'repeat(12, 1fr)' : ''),
                }}
            >
                {
                    dashboardComponentInfo.map((item: IDashboardCardComponentProps, index: number) => {
                        return (
                            <DashboardCardContent widget={item} key={index} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default DashboardCards;
