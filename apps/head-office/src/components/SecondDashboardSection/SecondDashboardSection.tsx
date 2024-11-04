import React from 'react';
import { useSelector } from 'react-redux';
import { detectDevice } from '@projects/common';
import SecondDashboardCardContent from './SecondDashboardCardContent';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';
import { ISecondDashboardCardComponentProps } from './types';
import './SecondDashboardSection.css';

const SecondDashboardSection: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-second-dashboard-page-cards`;
    const isDesktop: boolean = detectDevice().isDesktop;
    const secondDashboardComponentInfo = useSelector((state: RootState) => state.secondDashboardComponentInfo.componentInfo);

    return (
        <div
            className={`${pagePrefix}-container w-full flex justify-between flex-wrap w-full h-full grid`}
            style={{
                gap: "2em",
                gridTemplateColumns: (isDesktop ? 'repeat(12, 1fr)' : ''),
            }}
        >
            {
                secondDashboardComponentInfo.map((dashboardComponentItem: ISecondDashboardCardComponentProps, index: number) => {
                    return (
                        <SecondDashboardCardContent
                            key={index}
                            widget={dashboardComponentItem}
                        />
                    );
                })
            }
        </div>
    );
};

export default SecondDashboardSection;
