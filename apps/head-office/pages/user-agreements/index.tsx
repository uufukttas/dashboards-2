import Head from 'next/head';
import { PrimeReactProvider } from 'primereact/api';
import UserAggrementsPageWrapper from '../../src/components/UserAggrementsPageWrapper/UserAggrementsPageWrapper';
import ProviderComponent from './ProviderComponent';

const UserAggrementsPage = () => {
  return (
    <>
      <Head>
        <title>Kullanıcı Sözleşmeleri | Sharz.net</title>
      </Head>
      <ProviderComponent>
        <PrimeReactProvider>
          <UserAggrementsPageWrapper />
        </PrimeReactProvider>
      </ProviderComponent>
    </>
  );
};

export default UserAggrementsPage;
