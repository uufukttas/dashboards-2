import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '../../../app/redux/store';
import ServicePointDetailsPage from './ServicePointsDetailsPage'
import MainPage from '../../../src/components/MainPage/MainPage';
import '../../../app/global.css';
import '../../../src/styles/style.css';


const ServicePointInfoPage = () => {
  const router = useRouter();
  const slug = router.query?.slug;

  return (
    <>
      <Head>
        <title>{`Service Point Details - ${router.query.slug} | Sharz.net`}</title>
      </Head>
      <Provider store={store}>
        <div className="sh-service-point-detail-page-container w-full h-screen flex">
          <MainPage>
            <div className="service-point-page-wrapper flex justify-center items-center md:pt-12 flex-wrap w-full">
              {
                slug &&
                <ServicePointDetailsPage slug={slug[0]}/>
              }
            </div>
          </MainPage>
        </div >
      </Provider>
    </>
  );
};

export default ServicePointInfoPage;

