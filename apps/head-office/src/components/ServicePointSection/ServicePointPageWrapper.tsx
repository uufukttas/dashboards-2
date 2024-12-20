import React from 'react';
import ServicePointSection from '../../../src/components/ServicePointSection/ServicePointSection';
import { BRAND_PREFIX } from '../../constants/constants';
import MainComponent from '../MainComponent/MainComponent';

const ServicePointPageWrapper: React.FC = () => {
  const servicePointPagePrefix: string = `${BRAND_PREFIX}-service-points-page`;

  return (
    <div className={`${servicePointPagePrefix}-wrapper w-full flex h-screen`}>
      <MainComponent headerName="İstasyonlar">
        <ServicePointSection />
      </MainComponent>
    </div>
  );
};

export default ServicePointPageWrapper;
