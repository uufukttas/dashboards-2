import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';
import ServicePointSection from '../../../src/components/ServicePointSection/ServicePointSection';

const ServicePointPage: React.FC = () => {
    const servicePointPagePrefix: string = `${BRAND_PREFIX}-service-points-page`;
    const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);

    return (
        <div className={`${servicePointPagePrefix}-wrapper w-full flex h-screen`}>
            {
                isLoading
                    ? (
                        <Loading />
                    )
                    : (
                        <MainComponent headerName='Istasyonlar'>
                            <div className={`${servicePointPagePrefix}-container flex justify-center items-center md:pt-6 flex-wrap`}>
                                <ServicePointSection />
                            </div>
                        </MainComponent>
                    )
            }
        </div>
    );
};

export default ServicePointPage;
