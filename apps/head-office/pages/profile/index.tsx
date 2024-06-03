import React from 'react';
import Head from 'next/head';
import ProviderComponent from './ProviderComponent';
import ProfilePageWrapper from '../../src/components/Profile/ProfilePageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const Profile: React.FC = () => {
    return (
        <>
            <Head>
                <title>Profile Page | Sharz.net</title>
            </Head>
            <ProviderComponent>
                <ProfilePageWrapper />
            </ProviderComponent >
        </>
    );
};

export default Profile;
