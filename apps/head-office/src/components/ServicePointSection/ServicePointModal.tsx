import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ServicePointModalFormFirstPage from './ServicePointModalFormPages/ServicePointModalFormFirstPage';
import ServicePointModalFormFourthPage from './ServicePointModalFormPages/ServicePointModalFormFourthPage';
import ServicePointModalFormSecondPage from './ServicePointModalFormPages/ServicePointModalFormSecondPage';
import ServicePointModalFormThirdPage from './ServicePointModalFormPages/ServicePointModalFormThirdPage';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';

const formDataInitialValues = {
  'service-point-name': '',
  'service-point-reseller': 1,
  'service-point-company': 1,
  'service-point-phone-number-1': '',
  'service-point-phone-number-2': '',
  'service-point-address': '',
  'service-point-cityId': 1,
  'service-point-districtId': 1,
};

const ServicePointModalForm = () => {
  const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);
  const [activePage, setActivePage] = useState(1);
  const [cities, setCities] = useState<{ id: null; rid: number; plateCode: number; name: string; }[]>([]);
  const [districts, setDistricts] = useState<{ id: null; rid: number; name: string; plateCode: number; }[]>([]);
  const [formData, setFormData] =
    useState<{ [key: string]: string | number | boolean | string[] }>(formDataInitialValues);
  const [stationId, setStationId] = useState<number>(0);

  return (
    <div className={`${BRAND_PREFIX}-service-point-${servicePointData.id > 0 ? 'update' : 'create'}-form-wrapper`}>
      <div className={`${BRAND_PREFIX}-service-point-${servicePointData.id > 0 ? 'update' : 'create'}-modal-page-container relative p-6 bg-white rounded-lg max-h-[650px]`}>
        {activePage === 1 &&
          <ServicePointModalFormFirstPage
            activePage={activePage}
            stationId={stationId}
            setActivePage={setActivePage}
            setStationId={setStationId}
          />
        }
        {activePage === 2 &&
          <ServicePointModalFormSecondPage
            activePage={activePage}
            cities={cities}
            formData={formData}
            setActivePage={setActivePage}
            setCities={setCities}
            setDistricts={setDistricts}
            setFormData={setFormData}
          />
        }
        {activePage === 3 &&
          <ServicePointModalFormThirdPage
            activePage={activePage}
            cities={cities}
            districts={districts}
            formData={formData}
            setActivePage={setActivePage}
            setDistricts={setDistricts}
            setFormData={setFormData}
          />
        }
        {activePage === 4 &&
          <ServicePointModalFormFourthPage
            activePage={activePage}
            formData={formData}
            stationId={stationId}
            setActivePage={setActivePage}
            setFormData={setFormData}
          />
        }
      </div>
    </div>
  );
};

export default ServicePointModalForm;
