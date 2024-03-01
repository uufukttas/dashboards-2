import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ServicePointModalFormFirstPage from './ServicePointModalFormFirstPage';
import ServicePointModalFormSecondPage from './ServicePointModalFormSecondPage';
import ServicePointModalFormThirdPage from './ServicePointModalFormThirdPage';
import ServicePointModalFormFourthPage from './ServicePointModalFormFourthPage';
import { RootState } from '../../../app/redux/store';

const ServicePointModalForm = () => {
  const updatedServicePointData = useSelector((state: RootState) => state.updatedServicePointData.updatedServicePointData);
  const updatedServicePointInfoData = useSelector((state: RootState) => state.updatedServicePointInfoData.updatedServicePointInfoData);
  const [activePage, setActivePage] = useState(1);
  const [cities, setCities] = useState<{ id: null; rid: number; plateCode: number; name: string; }[]>([]);
  const [districts, setDistricts] = useState<{ id: null; rid: number; name: string; plateCode: number; }[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string | number | boolean | string[] }>({});
  const [stationId, setStationId] = useState<number>(0);

  console.log('updatedServicePointData', updatedServicePointData);
  console.log('updatedServicePointInfoData', updatedServicePointInfoData);

  return (
    <div className="service-point-create-form-wrapper">
      <div className="service-point-create-modal-fieldset-container relative p-4 bg-white rounded-lg sm:p-5 max-h-[650px]">
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
