import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import Dashboards from '../dashboards/dashboards.client'
import { store } from '../../app/redux/store';
import '../../app/global.css';
import '../../src/styles/style.css';

const DashboardsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Dashboards | Sharz.net</title>
      </Head>
      <Provider store={store}>
        <Dashboards />
      </Provider>
    </>
  );
};

export default DashboardsPage;
