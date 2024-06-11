import React from 'react';
import Head from 'next/head';
import ProviderComponent from './ProviderComponent';
import TarifsManagementPageWrapper from '../../src/components/TariffsManagementSection/TarifsManagementPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const TariffsManagement: React.FC = () => {
    return (
        <>
            <Head>
                <title>Tariffs Management | Sharz.net</title>
            </Head>
            <ProviderComponent>
                <TarifsManagementPageWrapper />
            </ProviderComponent >
        </>
    );
};

export default TariffsManagement;
