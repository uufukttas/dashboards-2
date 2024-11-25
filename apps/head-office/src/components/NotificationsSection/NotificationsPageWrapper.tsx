import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import MainComponent from '../MainComponent/MainComponent';
import NotificationsSection from './NotificationsSection';

const Notitications: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-faq-page`;

  return (
    <div className={`${pagePrefix}-wrapper w-full flex h-screen`}>
      <MainComponent headerName="Bildirim Merkezi">
        <div className={`${pagePrefix}-container w-full justify-center items-center md:pt-6 flex-wrap`}>
          <NotificationsSection />
        </div>
      </MainComponent>
    </div>
  );
};

export default Notitications;
