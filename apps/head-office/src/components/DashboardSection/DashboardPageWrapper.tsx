import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardSection from './DashboardSection';
import Loading from '../Loading/Loading';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX, dashboardTypes } from '../../constants/constants';
import { getDashboardComponentInfoRequest } from '../../../app/api/dashboards';
import { setDashboardComponentInfo } from '../../../app/redux/features/dashboardComponentInfo';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState } from '../../../app/redux/store';
import { IDashboardComponentInfoResponseProps } from './types';

const DashboardPageWrapper: React.FC = () => {
    const dashboardPrefix: string = `${BRAND_PREFIX}-dashboard`;
    const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
    const dispatch = useDispatch();

    const getDashboardComponentInfo = async (): Promise<void> => {
        const dashboardComponentInfo: IDashboardComponentInfoResponseProps =
            await getDashboardComponentInfoRequest(dashboardTypes[1]);

        dispatch(setDashboardComponentInfo(dashboardComponentInfo.data));
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
                                <DashboardSection />
                            </div>
                        </MainComponent>
                    )
            }
        </div>
    );
};

export default DashboardPageWrapper;
