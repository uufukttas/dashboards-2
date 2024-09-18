import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import SecondDashboards from '../../src/components/SecondDashboardSection/SecondDashboardPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const SecondDashboardsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Second Dashboards | Sharz.net</title>
      </Head>
      <Provider store={store}>
        <SecondDashboards />
      </Provider>
    </>
  );
};

export default SecondDashboardsPage;
