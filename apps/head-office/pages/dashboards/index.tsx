import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import MainPage from '../../src/components/MainPage/MainPage';
import { store } from '../../app/redux/store';
import '../../app/global.css';
import '../../src/styles/style.css';

const Dashboards = () => {
  return (
    <>
      <Head>
        <title>Dashboards | Sharz.net</title>
      </Head>
      <Provider store={store}>
        <div className='sh-dashboard-page-container w-full h-screen flex'>
          <MainPage>
            <div className='flex justify-center items-center pt-12 flex-wrap'>
            </div>
          </MainPage>
        </div >
      </Provider>
    </>
  );
};

export default Dashboards;
