import React from 'react';
import Head from 'next/head';
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import { store } from '../../../app/redux/store';
import ReportsPageWrapper from '../../../src/components/ReportsSection/ReportsPageWrapper';
import '../../../app/global.css';
import '../../../src/styles/style.css';
import "primereact/resources/themes/lara-light-cyan/theme.css"; 

const Reports: React.FC = () => {
  return (
    <>
      <Head>
        <title>Reports | Sharz.net</title>
      </Head>
      <PrimeReactProvider>
        <Provider store={store}>
          <ReportsPageWrapper />
        </Provider >
      </PrimeReactProvider >
    </>
  );
};

export default Reports;
