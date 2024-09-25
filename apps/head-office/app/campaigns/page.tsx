'use client';

import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import CampaignsPageWrapper from '../../src/components/Campaigns/CampaignsPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const Campaigns: React.FC = () => {
    return (
        <>
            <Head>
                <title>Campaigns Page | Sharz.net</title>
            </Head>
            <Provider store={store}>
                <CampaignsPageWrapper />
            </Provider>
        </>
    );
};

export default Campaigns;
