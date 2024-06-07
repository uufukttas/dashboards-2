import React from 'react';
import Head from 'next/head';
import ProviderComponent from './ProviderComponent';
import CampaignsPageWrapper from '../../src/components/Campaigns/CampaignsPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const Campaigns: React.FC = () => {
    return (
        <>
            <Head>
                <title>Campaigns Page | Sharz.net</title>
            </Head>
            <ProviderComponent>
                <CampaignsPageWrapper />
            </ProviderComponent >
        </>
    );
};

export default Campaigns;
