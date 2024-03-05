import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ServicePointModalFormFirstPage from './ServicePointModalFormPages/ServicePointModalFormFirstPage';
import ServicePointModalFormFourthPage from './ServicePointModalFormPages/ServicePointModalFormFourthPage';
import ServicePointModalFormSecondPage from './ServicePointModalFormPages/ServicePointModalFormSecondPage';
import ServicePointModalFormThirdPage from './ServicePointModalFormPages/ServicePointModalFormThirdPage';
import { RootState } from '../../../app/redux/store';

const ServicePointModalForm = () => {
  const updatedServicePointData = useSelector((state: RootState) => state.updatedServicePointData.updatedServicePointData);
  const updatedServicePointInfoData = useSelector((state: RootState) => state.updatedServicePointInfoData.updatedServicePointInfoData);
  const [activePage, setActivePage] = useState(4);
  const [cities, setCities] = useState<{ id: null; rid: number; plateCode: number; name: string; }[]>([]);
  const [districts, setDistricts] = useState<{ id: null; rid: number; name: string; plateCode: number; }[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string | number | boolean | string[] }>({});
  const [stationId, setStationId] = useState<number>(0);

  return (
    <div className={`sh-service-point-${updatedServicePointData.id > 0 ? 'update' : 'create'}-form-wrapper`}>
      <div className={`sh-service-point-${updatedServicePointData.id > 0 ? 'update' : 'create'}-modal-page-container relative p-6 bg-white rounded-lg max-h-[650px]`}>
        {activePage === 1 &&
          <ServicePointModalFormFirstPage
            activePage={activePage}
            formData={formData}
            stationId={stationId}
            setActivePage={setActivePage}
            setFormData={setFormData}
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
            setActivePage={setActivePage}
            setFormData={setFormData}
            stationId={stationId}
          />
        }
      </div>
    </div>
  );
};

export default ServicePointModalForm;
