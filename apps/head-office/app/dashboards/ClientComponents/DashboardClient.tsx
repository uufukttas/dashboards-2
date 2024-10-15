'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardSection from '../../../src/components/DashboardSection/DashboardSection';
import Loading from '../../../src/components/Loading/Loading';
import MainComponent from '../../../src/components/MainComponent/MainComponent';
import { BRAND_PREFIX } from '../../../src/constants/constants';
import { RootState } from '../../../app/redux/store';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { IDashboardClientProps } from '../types';
import { setDashboardData } from '../../redux/features/dashboardData';

const DashboardClient: React.FC<IDashboardClientProps> = ({ description, success, result }: IDashboardClientProps) => {
    const dashboardPrefix: string = `${BRAND_PREFIX}-dashboards`;
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);

    useEffect(() => {
        dispatch(setDashboardData({ description, success, result }));
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
                                <DashboardSection />
                            </div>
                        </MainComponent>
                    )
            }
        </div>
    )
};

export default DashboardClient;
