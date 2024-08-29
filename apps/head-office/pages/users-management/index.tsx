import React from 'react';
import Head from 'next/head';
import ProviderComponent from './ProviderComponent';
import UsersManagementPageWrapper from '../../src/components/UserManagement/UserManagementPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';

const UsersManagement: React.FC = () => {
    return (
        <>
            <Head>
                <title>Users Management | Sharz.net</title>
            </Head>
            <ProviderComponent>
                <UsersManagementPageWrapper />
            </ProviderComponent >
        </>
    );
};

export default UsersManagement;
