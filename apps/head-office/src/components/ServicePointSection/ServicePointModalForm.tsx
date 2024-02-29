import React, { useState } from 'react';
import ServicePointModalFormFirstPage from './ServicePointModalFormFirstPage';
import ServicePointModalFormSecondPage from './ServicePointModalFormSecondPage';
import ServicePointModalFormThirdPage from './ServicePointModalFormThirdPage';
import ServicePointModalFormFourthPage from './ServicePointModalFormFourthPage';

const ServicePointModalForm = () => {
  const [activePage, setActivePage] = useState(1);
  const [cities, setCities] = useState<{ id: null; rid: number; plateCode: number; name: string; }[]>([]);
  const [districts, setDistricts] = useState<{ id: null; rid: number; name: string; plateCode: number; }[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string | number | boolean | string[] }>({});
  const [stationId, setStationId] = useState<number>(0);

  console.log('formData', formData);
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
