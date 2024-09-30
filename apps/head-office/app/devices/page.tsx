/*
    When we add api integration, it will be execute on the server side. But it is not executable on the server side.
    There is no any api on the devices right now.
    If there is any api integration, we can use getStaticProps or getServerSideProps.
    End of the integration we can remove this comment and 'use client' declaration.
*/
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
