/*
    When we add api integration, it will be execute on the server side. But it is not executable on the server side.
    There is no any api on the faq right now.
    If there is any api integration, we can use getStaticProps or getServerSideProps.
    End of the integration we can remove this comment and 'use client' declaration.
*/
'use client';

import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import '../../app/global.css';
import { store } from '../../app/redux/store';
import FAQPageWrapper from '../../src/components/FAQ/FAQPageWrapper';
import '../../src/styles/style.css';

const FAQ: React.FC = () => {
  return (
    <>
      <Head>
        <title>FAQ Page | Sharz.net</title>
      </Head>
      <Provider store={store}>
        <FAQPageWrapper />
      </Provider>
    </>
  );
};

export default FAQ;
