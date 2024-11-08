'use client';

import React from 'react';
import Head from 'next/head';
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import { store } from '../../../app/redux/store';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import '../../../app/global.css';
import '../../../src/styles/style.css';
import ReportsPageWrapper from '../../../src/components/ReportsSection/ReportsPageWrapper';

const Reports: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kullanıcı Raporları | Sharz.net</title>
      </Head>
      <PrimeReactProvider>
        <Provider store={store}>
          <ReportsPageWrapper reportType='user' />
        </Provider>
      </PrimeReactProvider>
    </>
  );
};

export default Reports;
