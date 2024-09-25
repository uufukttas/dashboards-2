import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import ReportsPageWrapper from '../../../src/components/ReportsSection/ReportsPageWrapper';
import '../../../app/global.css';
import '../../../src/styles/style.css';

const Reports: React.FC = () => {
  return (
    <>
      <Head>
        <title>Reports | Sharz.net</title>
      </Head>
      <Provider store={store}>
        <ReportsPageWrapper />
      </Provider>
    </>
  );
};

export default Reports;
