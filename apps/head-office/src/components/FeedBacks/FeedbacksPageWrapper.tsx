import React from 'react';
import FeedBacksSection from './FeedbacksSection';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX } from '../../constants/constants';

const FeedBacksPageWrapper: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-feedbacks-page`;

  return (
    <div className={`${pagePrefix}-wrapper w-full flex h-screen`}>
      <MainComponent headerName="Market">
        <div className={`${pagePrefix}-container w-full justify-center items-center md:pt-6 flex-wrap`}>
          <FeedBacksSection />
        </div>
      </MainComponent>
    </div>
  );
};

export default FeedBacksPageWrapper;
