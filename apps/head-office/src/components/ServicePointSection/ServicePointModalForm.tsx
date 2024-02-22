import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { servicePointModalInputs } from './ServicePointModalFormInputs';
import ServicePointFormPage from './ServicePointFormPage';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { RootState } from '../../../app/redux/store';

const ServicePointModalForm = () => {
  const dispatch = useDispatch();
  const modalInputs = servicePointModalInputs;
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
  const updatedServicePoint = useSelector((state: RootState) => state.updatedServicePointReducer.updatedServicePoint);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { handleSubmit } = useForm();

  const getCities = async () => {
    try {
      const cityResponse = await axios.get('https://testapideneme.azurewebsites.net/Values/GetCities').then((response) => response.data);
      setCities(cityResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDistricts = async () => {
    try {
      const districtResponse = await axios.post(`https://testapideneme.azurewebsites.net/Values/GetDistricts`, { 'plateNumber': Number(formData['service-point-city']) }).then((response) => response.data);
      setDistricts(districtResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createServicePoint = () => {
    const data = JSON.stringify({
      "name": formData['service-point-name'],
      "title": formData['service-point-property'],
      "phoneNumbers": [
        formData['service-point-number1'],
        formData['service-point-number2']
      ],
      "address": formData['service-point-address'],
      "city": Number(formData['service-point-city']) || 1,
      "district": Number(formData['service-point-district']) || 1,
      "paymentMethods": [formData['service-point-payment-methods']],
      "freePark": formData['service-point-parking'] === 'true' ? true : false,
      "opportunities": [
        formData['service-point-opportunity']
      ],
      "longitude": Number(formData['service-point-x-coor']),
      "latitude": Number(formData['service-point-y-coor']),
    });

    axios.post('https://testapideneme.azurewebsites.net/ServicePoint/AddPoint', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        dispatch(toggleModalVisibility(isModalVisible));
      })
      .catch((error) => {
        console.log(error);
      });


  };

  const updateServicePoint = () => {
    const data = JSON.stringify({
      "id": updatedServicePoint.id,
      "name": formData['service-point-name'],
      "title": formData['service-point-property'],
      "phoneNumbers": [formData['service-point-number1'], formData['service-point-number2']],
      "address": formData['service-point-address'],
      "city": Number(formData['service-point-city']),
      "district": Number(formData['service-point-district']),
      "paymentMethods": [formData['service-point-payment-methods']],
      "freePark": formData['service-point-parking'],
      "opportunities": [formData['service-point-opportunity']],
      "longitude": Number(formData['service-point-x-coor']),
      "latitude": Number(formData['service-point-y-coor'])
    });

    axios.post('https://testapideneme.azurewebsites.net/ServicePoint/Update', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        dispatch(toggleModalVisibility(isModalVisible));
      })
      .catch((error) => {
        console.log(error);
      });

  };

  useEffect(() => {
    if (activePage === 1) {
      getCities();
    }

    if (formData['service-point-city']) {
      getDistricts();
    }
  }, [activePage, formData['service-point-city']]);

  return (
    <div className='create-service-point-form-wrapper'>
      <form onSubmit={handleSubmit(Object.keys(updatedServicePoint).length > 0 ? updateServicePoint : createServicePoint)}>
        <div className="relative p-4 bg-white rounded-lg sm:p-5 max-h-[650px]">
          {modalInputs.map((modalPageInputs, modalPageIndex) => (
            <ServicePointFormPage key={modalPageIndex} modalPageInputs={modalPageInputs} modalPageIndex={modalPageIndex} activePage={activePage} setActivePage={setActivePage} cities={cities} districts={districts} formData={formData} setFormData={setFormData} />
          ))}
        </div>
      </form>
    </div>
  );
}

export default ServicePointModalForm;
