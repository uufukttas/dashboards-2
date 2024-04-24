import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import MainPage from '../MainPage/MainPage';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState, AppDispatch } from '../../../app/redux/store';
import ServicePointSection from '../../../src/components/ServicePointSection/ServicePointSection';

const ServicePointPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);

    useEffect(() => {
        dispatch(toggleLoadingVisibility(true));
    }, []);

    return (
        <div className={`${BRAND_PREFIX}-service-points-page-wrapper w-full flex h-screen`}>
            {
                isLoading
                    ? (
                        <Loading />
                    )
                    : (
                        <MainPage sectionName='Servis Noktalari'>
                            <div className={`${BRAND_PREFIX}-service-points-page-container flex justify-center items-center md:pt-6 flex-wrap`}>
                                <ServicePointSection />
                            </div>
                        </MainPage>
                    )
            }
        </div>
    );
};

export default ServicePointPage;
