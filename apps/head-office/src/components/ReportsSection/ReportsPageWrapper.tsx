import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import MainPage from '../MainPage/MainPage';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState, AppDispatch } from '../../../app/redux/store';
import ReportsSection from './ReportsSection';

const Reports: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-reports-center-page`;
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);

    useEffect(() => {
        dispatch(toggleLoadingVisibility(false));
    }, []);

    return (
        <div className={`${pagePrefix}-wrapper w-full flex h-screen`}>
            {
                isLoading
                    ? (
                        <Loading />
                    )
                    : (
                        <MainPage headerName='Rapor Merkezi'>
                            <div className={`${pagePrefix}-container justify-center items-center md:pt-6 flex-wrap`}>
                                <ReportsSection />
                            </div>
                        </MainPage>
                    )
            }
        </div>
    );
};

export default Reports;
