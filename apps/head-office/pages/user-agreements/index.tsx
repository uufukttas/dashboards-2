'use client';

import Head from 'next/head';
import { PrimeReactProvider } from 'primereact/api';
import UserAggrementsPageWrapper from '../../src/components/UserAggrementsPageWrapper/UserAggrementsPageWrapper';
import '../../src/styles/style.css';
import ProviderComponent from './ProviderComponent';

const UserAggrementsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kullanıcı Sözleşmeleri | Sharz.net</title>
      </Head>
      <PrimeReactProvider>
        <ProviderComponent>
          <UserAggrementsPageWrapper />
        </ProviderComponent>
      </PrimeReactProvider>
    </>
  );
};

export default UserAggrementsPage;
