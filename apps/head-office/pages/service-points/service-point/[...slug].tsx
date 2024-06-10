import React from 'react';
import { Montserrat } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '../../../app/redux/store';
import MainPage from '../../../src/components/MainPage/MainPage';
import ServicePointDetails from '../../../src/components/ServicePointsDetails/ServicePointDetails';
import { BRAND_PREFIX } from '../../../src/constants/constants';
import '../../../app/global.css';
import '../../../src/styles/style.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const ServicePointInfoPage: React.FC = () => {
  const router = useRouter();
  const slug = router.query?.slug;

  return (
    <>
      <Head>
        <title>{`Service Point Details ${router.query.slug ? `- ${router.query.slug}` : ''} | Sharz.net`}</title>
      </Head>
      <Provider store={store}>
        <div className={`${montserrat.className} ${BRAND_PREFIX}-service-point-details-page-wrapper w-full h-screen flex`}>
          <MainPage headerName={`Istasyon: ${slug}`}>
            <div
              className={`${BRAND_PREFIX}-service-point-details-page-container flex justify-center items-center flex-wrap w-full`}
            >
              {
                slug && (
                  <ServicePointDetails slug={slug[0]} />
                )
              }
            </div>
          </MainPage>
        </div>
      </Provider>
    </>
  );
};

export default ServicePointInfoPage;
