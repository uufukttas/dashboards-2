import React from 'react';
import MarketPlaceSection from './MarketPlaceSection';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX } from '../../constants/constants';

const MarketPlacePageWrapper: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-marketplace-page`;

  return (
    <div className={`${pagePrefix}-wrapper w-full flex h-screen`}>
      <MainComponent headerName="Market">
        <div className={`${pagePrefix}-container w-full justify-center items-center md:pt-6 flex-wrap`}>
          <MarketPlaceSection />
        </div>
      </MainComponent>
    </div>
  );
};

export default MarketPlacePageWrapper;
