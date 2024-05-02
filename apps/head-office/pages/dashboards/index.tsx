import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import DashboardsPageWrapper from '../../src/components/DashboardSection/DashboardPageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const Dashboards: React.FC = () => {
  return (
    <>
      <Head>
        <title>Dashboards | Sharz.net</title>
      </Head>
      <Provider store={store}>
        <DashboardsPageWrapper />
      </Provider>
    </>
  );
};

export default Dashboards;
