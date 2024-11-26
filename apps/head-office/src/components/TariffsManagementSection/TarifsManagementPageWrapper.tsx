import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import MainComponent from '../MainComponent/MainComponent';
import TariffsManagementSection from './TarifsManagementSection';

const TarifssManagement: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-tarifss-management-page`;

  return (
    <div className={`${pagePrefix}-wrapper w-full flex h-screen`}>
      <MainComponent headerName="Tarife Yönetimi">
        <div className={`${pagePrefix}-container w-full justify-center items-center md:pt-6 flex-wrap`}>
          <TariffsManagementSection />
        </div>
      </MainComponent>
    </div>
  );
};

export default TarifssManagement;
