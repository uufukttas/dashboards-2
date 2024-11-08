import React from 'react';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX } from '../../constants/constants';
import ServicePointSection from '../../../src/components/ServicePointSection/ServicePointSection';

const ServicePointPage: React.FC = () => {
  const servicePointPagePrefix: string = `${BRAND_PREFIX}-service-points-page`;

  return (
    <div className={`${servicePointPagePrefix}-wrapper w-full flex h-screen`}>
      {
        <MainComponent headerName="İstasyonlar">
          <div
            className={`${servicePointPagePrefix}-container w-full flex justify-center items-center md:pt-6 flex-wrap`}
          >
            <ServicePointSection />
          </div>
        </MainComponent>
      }
    </div>
  );
};

export default ServicePointPage;
