'use client';

import Head from 'next/head';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import React from 'react';
import { Provider } from 'react-redux';
import '../../app/global.css';
import { store } from '../../app/redux/store';
import NotificationsPageWrapper from '../../src/components/NotificationsSection/NotificationsPageWrapper';
import '../../src/styles/style.css';

const NotificationsPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Bildirim Merkezi | Sharz.net</title>
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
