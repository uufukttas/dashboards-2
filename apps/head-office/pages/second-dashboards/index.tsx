import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import SecondDashboardWrapper from '../../src/components/SecondDashboardSection/SecondDashboardPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const SecondDashboardsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Second Dashboards | Sharz.net</title>
      </Head>
      <Provider store={store}>
        <SecondDashboardWrapper />
      </Provider>
    </>
  );
};

export default SecondDashboardsPage;
