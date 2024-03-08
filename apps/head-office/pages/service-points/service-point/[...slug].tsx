import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '../../../app/redux/store';
import ServicePointDetailsPage from './ServicePointsDetailsPage';
import Accordion from '../../../src/components/Accordion/Accordion';
import MainPage from '../../../src/components/MainPage/MainPage';
import { BRAND_PREFIX } from '../../../src/constants/constants';
import '../../../app/global.css';
import '../../../src/styles/style.css';


const ServicePointInfoPage = () => {
  const router = useRouter();
  const slug = router.query?.slug;

  const workingHoursContent = (
    <div className="working-hours-content py-8">
    Bu servis istasyonunun calisma saatleri 08:00 - 18:00 arasindadir.
    </div>
  );

  return (
    <>
      <Head>
        <title>{`Service Point Details - ${router.query.slug} | Sharz.net`}</title>
      </Head>
      <Provider store={store}>
        <div className={`${BRAND_PREFIX}-service-point-detail-page-container w-full h-screen flex`}>
          <MainPage>
            <div className="service-point-page-wrapper flex justify-center items-center md:pt-12 flex-wrap w-full ">
              {
                slug && (
                  <>
                    <ServicePointDetailsPage slug={slug[0]} />
                    <Accordion accordionTitle={'Calisma Saatleri'} accordionContent={workingHoursContent} className={`mx-8 rounded-lg`}/>
                  </>
                )
              }
            </div>
          </MainPage>
        </div >
      </Provider>
    </>
  );
};

export default ServicePointInfoPage;

