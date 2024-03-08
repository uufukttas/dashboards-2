import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import MainPage from '../../src/components/MainPage/MainPage';
import { BRAND_PREFIX } from '../../src/constants/constants';
import ServicePointSection from '../../src/components/ServicePointSection/ServicePointSection';
import '../../app/global.css';
import '../../src/styles/style.css';

const ServicePoint = () => {
    return (
        <>
            <Head>
                <title>Service Points | Sharz.net</title>
            </Head>
            <Provider store={store}>
                <div className={`${BRAND_PREFIX}-service-point-page-container w-full h-screen flex`}>
                    <MainPage>
                        <div className="service-point-page-wrapper flex justify-center items-center md:pt-12 flex-wrap">
                            <ServicePointSection />
                        </div>
                    </MainPage>
                </div>
            </Provider >
        </>
    )
};

export default ServicePoint;
