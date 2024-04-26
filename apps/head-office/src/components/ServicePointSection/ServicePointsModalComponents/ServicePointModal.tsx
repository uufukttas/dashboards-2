import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ServicePointModalFormFirstPage from './ServicePointModalFormPages/ServicePointModalFormFirstPage';
import ServicePointModalFormFourthPage from './ServicePointModalFormPages/ServicePointModalFormFourthPage';
import ServicePointModalFormSecondPage from './ServicePointModalFormPages/ServicePointModalFormSecondPage';
import ServicePointModalFormThirdPage from './ServicePointModalFormPages/ServicePointModalFormThirdPage';
import { BRAND_PREFIX } from '../../../constants/constants';
import { RootState } from '../../../../app/redux/store';

const ServicePointModalForm: React.FC = () => {
  const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);
  const [activePage, setActivePage] = useState(1);
  const [cities, setCities] = useState<{ id: null; rid: number; plateCode: number; name: string; }[]>([]);
  const [districts, setDistricts] = useState<{ id: null; rid: number; name: string; plateCode: number; }[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<{ id: null; name: string; rid: number; }[]>([]);
  const [stationId, setStationId] = useState<number>(0);

  return (
    <div className={`${BRAND_PREFIX}-service-point-${servicePointData.id > 0 ? 'update' : 'create'}-form-wrapper`}>
      <div className={`${BRAND_PREFIX}-service-point-${servicePointData.id > 0 ? 'update' : 'create'}-modal-page-container relative p-6 bg-white rounded-lg max-h-[650px]`}>
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
            />
          )
        }
        {
          activePage === 4 && (
            <ServicePointModalFormFourthPage
              activePage={activePage}
              paymentMethods={paymentMethods}
              stationId={stationId}
              setActivePage={setActivePage}
            />
          )
        }
      </div>
    </div>
  );
};

export default ServicePointModalForm;
