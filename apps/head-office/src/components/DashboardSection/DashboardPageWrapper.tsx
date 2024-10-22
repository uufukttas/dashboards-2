import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardSection from './DashboardSection';
import Loading from '../Loading/Loading';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';

const DashboardPage: React.FC = () => {
    const dashboardPrefix: string = `${BRAND_PREFIX}-dashboards`;
    const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
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
    )
};

export default DashboardPage;