import React from 'react';
import DevicesSection from './DevicesSection';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX } from '../../constants/constants';

const Devices: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-devices-page`;

  return (
    <div className={`${pagePrefix}-wrapper w-full flex h-screen`}>
      <MainComponent headerName="Cihazlar">
        <div className={`${pagePrefix}-container justify-center items-center md:pt-6 flex-wrap w-full`}>
          <DevicesSection />
        </div>
      </MainComponent>
    </div>
  );
};

export default Devices;
