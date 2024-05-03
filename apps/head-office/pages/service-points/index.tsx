import React from 'react';
import Head from 'next/head';
import ProviderComponent from './ProviderComponent';
import ServicePointsPageWrapper from '../../src/components/ServicePointSection/ServicePointPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const ServicePoints: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Service Points | Sharz.net</title>
            </Head>
            <ProviderComponent>
                <ServicePointsPageWrapper />
            </ProviderComponent >
        </>
    )
};

export default ServicePoints;
