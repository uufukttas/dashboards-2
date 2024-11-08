'use client';

import React from 'react';
import Head from 'next/head';
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import { store } from '../../../app/redux/store';
import ReportsPageWrapper from '../../../src/components/ReportsSection/ReportsPageWrapper';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import '../../../app/global.css';
import '../../../src/styles/style.css';

const Reports: React.FC = () => {
  return (
    <>
      <Head>
        <title>Şarz Raporları | Sharz.net</title>
      </Head>
      <PrimeReactProvider>
        <Provider store={store}>
          <ReportsPageWrapper reportType='charge'/>
        </Provider>
      </PrimeReactProvider>
    </>
  );
};

export default Reports;
