import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ServicePointModalFormFirstPage from './ServicePointModalFormPages/ServicePointModalFormFirstPage';
import ServicePointModalFormFourthPage from './ServicePointModalFormPages/ServicePointModalFormFourthPage';
import ServicePointModalFormSecondPage from './ServicePointModalFormPages/ServicePointModalFormSecondPage';
import ServicePointModalFormThirdPage from './ServicePointModalFormPages/ServicePointModalFormThirdPage';
import { BRAND_PREFIX } from '../../../constants/constants';
import { RootState } from '../../../../app/redux/store';
import { ICitiesProps, IFeatureProps } from '../types';

const ServicePointModalForm: React.FC = () => {
  const servicePointModalPrefix: string = `${BRAND_PREFIX}-service-point`;
  const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);
  const isCreateData: boolean = servicePointData.id === 0;
  const [activePage, setActivePage] = useState(1);
  const [cities, setCities] = useState<ICitiesProps[]>([]);
  const [districts, setDistricts] = useState<ICitiesProps[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<IFeatureProps[]>([]);
  const [opportunities, setOpportunities] = useState<IFeatureProps[]>([]);
  const [stationId, setStationId] = useState<number>(0);

  return (
    <div className={`${servicePointModalPrefix}-${isCreateData ? 'create' : 'update'}-modal-form-wrapper`}>
      <div className={`${servicePointModalPrefix}-${isCreateData ? 'create' : 'update'}-modal-form-container relative p-6 bg-white rounded-lg max-h-[650px]`}>
        {
          activePage === 1 && (
            <ServicePointModalFormFirstPage
              activePage={activePage}
              stationId={stationId}
              setActivePage={setActivePage}
              setStationId={setStationId}
            />
          )
        }
        {
          activePage === 2 && (
            <ServicePointModalFormSecondPage
              activePage={activePage}
              cities={cities}
              setActivePage={setActivePage}
              setCities={setCities}
              setDistricts={setDistricts}
            />
          )
        }
        {
          activePage === 3 && (
            <ServicePointModalFormThirdPage
              activePage={activePage}
              cities={cities}
              districts={districts}
              setActivePage={setActivePage}
              setDistricts={setDistricts}
              setPaymentMethods={setPaymentMethods}
              setOpportunities={setOpportunities}
            />
          )
        }
        {
          activePage === 4 && (
            <ServicePointModalFormFourthPage
              activePage={activePage}
              paymentMethods={paymentMethods}
              opportunities={opportunities}
              stationId={stationId}
              setActivePage={setActivePage}
              setPaymentMethods={setPaymentMethods}
              setOpportunities={setOpportunities}
            />
          )
        }
      </div>
    </div>
  );
};

export default ServicePointModalForm;
