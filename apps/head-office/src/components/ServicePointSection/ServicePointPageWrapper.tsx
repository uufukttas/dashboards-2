import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState, } from '../../../app/redux/store';
import MainPage from '../MainPage/MainPage';
import Loading from '../Loading/Loading';
import ServicePointSection from '../../../src/components/ServicePointSection/ServicePointSection';
import { BRAND_PREFIX } from '../../constants/constants';

const ServicePointPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.loadingReducer.isLoading);

    useEffect(() => {
        dispatch(toggleLoadingVisibility(true));
    }, []);

    return (
        <div className={`${BRAND_PREFIX}-service-point-page-container w-full h-screen flex`}>
            {isLoading
                ? <Loading />
                : (
                    <MainPage>
                        <div
                            className={`${BRAND_PREFIX}-service-point-page-wrapper flex justify-center items-center md:pt-12 flex-wrap`}
                        >
                            <ServicePointSection />
                        </div>
                    </MainPage>
                )
            }
        </div>
    );
};

export default ServicePointPage;
