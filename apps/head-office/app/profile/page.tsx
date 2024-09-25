'use client';

import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import ProfilePageWrapper from '../../src/components/Profile/ProfilePageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const Profile: React.FC = () => {
    return (
        <>
            <Head>
                <title>Profile Page | Sharz.net</title>
            </Head>
            <Provider store={store}>
                <ProfilePageWrapper />
            </Provider>
        </>
    );
};

export default Profile;
