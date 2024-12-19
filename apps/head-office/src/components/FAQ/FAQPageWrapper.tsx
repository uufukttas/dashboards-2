import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import MainComponent from '../MainComponent/MainComponent';
import FAQSection from './FAQSection';

const FAQ: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-faq-page`;

  return (
    <div className={`${pagePrefix}-wrapper w-full flex h-screen`}>
      <MainComponent headerName="Sıkça Sorular Sorular">
        <div className={`${pagePrefix}-container  w-full`}>
          <FAQSection />
        </div>
      </MainComponent>
    </div>
  );
};

export default FAQ;
