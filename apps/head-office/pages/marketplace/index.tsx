/*
    When we add api integration, it will be execute on the server side. But it is not executable on the server side.
    There is no any api on the faq right now.
    If there is any api integration, we can use getStaticProps or getServerSideProps.
    End of the integration we can remove this comment and 'use client' declaration.
*/
'use client';

import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import MarketPlacePageWrapper from '../../src/components/Marketplace/MarketPlacePageWrapper';
import '../../app/global.css';
import '../../src/styles/style.css';

const MarketPlace: React.FC = () => {
  return (
    <>
      <Head>
        <title>MarketPlace Page | Sharz.net</title>
      </Head>
      <Provider store={store}>
        <MarketPlacePageWrapper />
      </Provider>
    </>
  );
};

export default MarketPlace;
