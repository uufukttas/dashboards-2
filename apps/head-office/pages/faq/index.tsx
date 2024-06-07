import React from 'react';
import Head from 'next/head';
import ProviderComponent from './ProviderComponent';
import FAQPageWrapper from '../../src/components/FAQ/FAQPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const FAQ: React.FC = () => {
    return (
        <>
            <Head>
                <title>FAQ Page | Sharz.net</title>
            </Head>
            <ProviderComponent>
                <FAQPageWrapper />
            </ProviderComponent >
        </>
    );
};

export default FAQ;
