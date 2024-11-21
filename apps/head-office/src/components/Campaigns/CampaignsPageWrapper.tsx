import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import MainComponent from '../MainComponent/MainComponent';
import CampaignsSection from './CampaignsSection';

const Campaigns: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-campaigns-page`;

  return (
    <div className={`${pagePrefix}-wrapper w-full flex h-screen`}>
      <MainComponent headerName="Kampanyalar ve Duyurular">
        <div className={`${pagePrefix}-container justify-center items-center md:pt-6 flex-wrap`}>
          <CampaignsSection />
        </div>
      </MainComponent>
    </div>
  );
};

export default Campaigns;
