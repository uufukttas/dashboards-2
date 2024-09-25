'use client';

import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import DevicesPageWrapper from '../../src/components/Devices/DevicesPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const Campaigns: React.FC = () => {
    return (
        <>
            <Head>
                <title>Campaigns Page | Sharz.net</title>
            </Head>
            <Provider store={store}>
                <DevicesPageWrapper />
            </Provider>
        </>
    );
};

export default Campaigns;
