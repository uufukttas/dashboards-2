'use client';

import React from 'react';
import Head from 'next/head';
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import NotificationsPageWrapper from '../../src/components/NotificationsSection/NotificationsPageWrapper';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import '../../app/global.css';
import '../../src/styles/style.css';

const NotificationsPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Reports | Sharz.net</title>
            </Head>
            <PrimeReactProvider>
                <Provider store={store}>
                    <NotificationsPageWrapper />
                </Provider >
            </PrimeReactProvider >
        </>
    );
};

export default NotificationsPage;
