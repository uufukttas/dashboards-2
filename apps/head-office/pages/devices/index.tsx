import React from 'react';
import Head from 'next/head';
import ProviderComponent from './ProviderComponent';
import DevicesPageWrapper from '../../src/components/Devices/DevicesPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const Campaigns: React.FC = () => {
    return (
        <>
            <Head>
                <title>Campaigns Page | Sharz.net</title>
            </Head>
            <ProviderComponent>
                <DevicesPageWrapper />
            </ProviderComponent >
        </>
    );
};

export default Campaigns;
