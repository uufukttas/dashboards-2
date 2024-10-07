import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '../../../app/redux/store';
import MainComponent from '../../../src/components/MainComponent/MainComponent';
import ServicePointDetails from '../../../src/components/ServicePointsDetails/ServicePointDetails';
import { BRAND_PREFIX } from '../../../src/constants/constants';
import '../../../app/global.css';
import '../../../src/styles/style.css';

const ServicePointInfoPage: React.FC = () => {
  const router = useRouter();
  const slug = router.query?.slug;

  return (
    <>
      <Head>
        <title>{`Service Point Details ${router.query.slug ? `- ${router.query.slug}` : ''} | Sharz.net`}</title>
      </Head>
      <Provider store={store}>
        <div className={`${BRAND_PREFIX}-service-point-details-page-wrapper w-full flex`}>
          <MainComponent headerName={`Istasyon: ${slug}`}>
            <div
              className={`${BRAND_PREFIX}-service-point-details-page-container flex justify-center items-center flex-wrap w-full`}
            >
              {
                slug && (
                  <ServicePointDetails slug={slug[0]} />
                )
              }
            </div>
          </MainComponent>
        </div>
      </Provider>
    </>
  );
};

export default ServicePointInfoPage;
