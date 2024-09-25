'use client';

import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import FAQPageWrapper from '../../src/components/FAQ/FAQPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const FAQ: React.FC = () => {
    return (
        <>
            <Head>
                <title>FAQ Page | Sharz.net</title>
            </Head>
            <Provider store={store}>
                <FAQPageWrapper />
            </Provider>

        </>
    );
};

export default FAQ;
