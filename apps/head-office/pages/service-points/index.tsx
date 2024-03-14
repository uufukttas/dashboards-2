import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import ServicePointPage from './ServicePointPage';
import { store } from '../../app/redux/store';
import '../../app/global.css';
import '../../src/styles/style.css';

const ServicePoint = () => {
    return (
        <>
            <Head>
                <title>Service Points | Sharz.net</title>
            </Head>
            <Provider store={store}>
                <ServicePointPage />
            </Provider >
        </>
    )
};

export default ServicePoint;
