import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import HelperDashboardPageWrapper from '../../src/components/HelperDashboardSection/HelperDashboardPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const HelperDashboardPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Helper Dashboard | Sharz.net</title>
      </Head>
      <Provider store={store}>
        <HelperDashboardPageWrapper />
      </Provider>
    </>
  );
};

export default HelperDashboardPage;
