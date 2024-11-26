/*
    When we add api integration, it will be execute on the server side. But it is not executable on the server side.
    There is no any api on the campaigns right now.
    If there is any api integration, we can use getStaticProps or getServerSideProps.
    End of the integration we can remove this comment and 'use client' declaration.
*/
'use client';

import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import '../../app/global.css';
import { store } from '../../app/redux/store';
import CampaignsPageWrapper from '../../src/components/Campaigns/CampaignsPageWrapper';
import '../../src/styles/style.css';

const Campaigns: React.FC = () => {
  return (
    <>
      <Head>
        <title>Campaigns Page | Sharz.net</title>
      </Head>
      <Provider store={store}>
        <CampaignsPageWrapper />
      </Provider>
    </>
  );
};

export default Campaigns;
