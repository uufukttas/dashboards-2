import React, { useEffect } from 'react';
import { Montserrat } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import MainPage from '../MainPage/MainPage';
import { BRAND_PREFIX } from '../../constants/constants';
import { getColors } from '../../../app/api/profile';
import { setConfigs } from '../../../app/redux/features/setConfig';
import { RootState, AppDispatch } from '../../../app/redux/store';
import ServicePointSection from '../../../src/components/ServicePointSection/ServicePointSection';

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

const ServicePointPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const colors = useSelector((state: RootState) => state.configs.colors);
    const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);

    const fetchConfigurations = async (): Promise<void> => {
        const colors = await getColors(["Ana", "Ikincil", "Alternatif", "Ikincil Yedek"]);

        dispatch(setConfigs(colors.data));
    };

    useEffect(() => {
        fetchConfigurations();
    }, []);

    return (
        <div
            className={`${montserrat.className} ${BRAND_PREFIX}-service-points-page-wrapper w-full flex h-screen`}
            style={{ '--color-primary': `${colors && colors[0]?.value}`, '--color-secondary': `${colors && colors[1]?.value}` } as React.CSSProperties}
        >

            {
                isLoading
                    ? (
                        <Loading />
                    )
                    : (
                        <MainPage headerName='Istasyonlar'>
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
