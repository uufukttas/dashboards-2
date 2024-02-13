import Modal from '../Modal/Modal';
import Table from '../Table/Table';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/redux/store';
import { setSelectedCity } from '../../../app/redux/features/setSelectedCity';

export interface ServicePointSectionProps {
  children?: React.ReactNode;
}

export function ServicePointSection() {
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const selectedCity = useSelector((state: RootState) => state.getSelectedCityReducer.city);


  useEffect(() => { getCities(); }, [selectedCity]);

  const inputs = [
    [
      {
        id: 'service-point-name',
        inputClassName: 'bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4',
        name: 'service-point-name',
        label: 'Hizmet Noktasi Ismi',
        labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        type: 'text',
        placeholder: '',
        pattern: '^[A-Za-z0-9]',
        extra: '',
        required: true,
        error: 'Hizmet Noktasi Ismi Bos Birakilamaz.',
      }, {
        inputClassName: 'bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4',
        id: 'service-point-property',
        name: 'service-point-property',
        label: 'Hizmet Noktasi Ozelligi',
        labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        type: 'dropdown',
        placeholder: '',
        pattern: '',
        extra: {
          items: ['AVM', 'Sosyal Tesis']
        },
        required: false,
        error: 'Hizmet Noktasi Ozelligi Bos Birakilamaz.',
      }, {
        inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
        id: 'service-point-number1',
        name: 'service-point-number1',
        label: 'Servis Noktasi Sorumlu Telefon',
        labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        type: 'number',
        placeholder: '(555) 123 12 12',
        pattern: '[0-9]{10}',
        extra: '',
        required: true,
        error: 'Hizmet Noktasi Telefon Numarasi Bos Birakilamaz'
      }, {
        inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
        id: 'service-point-number2',
        name: 'service-point-number2',
        label: 'Servis Noktasi Sorumlu Telefon',
        labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        type: 'number',
        placeholder: '(555) 123 12 12',
        pattern: '[0-9]{10}',
        extra: '',
        required: false,
        error: 'Hizmet Noktasi Telefon Numarasi Bos Birakilamaz'
      }, {
        inputClassName: 'mb-4',
        id: 'service-point-address',
        name: 'service-point-address',
        label: 'Hizmet Noktasi Adresi',
        labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        type: 'textarea',
        placeholder: 'Adresi giriniz...',
        pattern: '',
        extra: '',
        required: true,
        error: 'Hizmet Noktasi Adresi Bos Birakilamaz'
      }, {
        inputClassName: '',
        id: 'modal-next-button',
        name: 'modal-next-button',
        label: 'Ileri',
        labelClassName: '',
        type: 'button',
        placeholder: '',
        pattern: '',
        extra: '',
        required: false,
        error: '',
        onClick: (() => { console.log('clicked') })
      }
    ], [
      {
        inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
        id: 'service-point-x-coor',
        name: 'service-point-x-coor',
        label: 'Hizmet Noktasi X Koordinati',
        labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        type: 'text',
        placeholder: '',
        pattern: '[0-9]',
        extra: '',
        required: true,
        error: 'Hizmet Noktasi X Koordinati Bos Birakilamaz.',
      }, {
        inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
        id: 'service-point-y-coor',
        name: 'service-point-y-coor',
        label: 'Hizmet Noktasi Y Koordinati',
        labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        type: 'text',
        placeholder: '',
        pattern: '[0-9]',
        extra: '',
        required: true,
        error: 'Hizmet Noktasi Y Koordinati Bos Birakilamaz.',
      }, {
        inputClassName: '',
        id: 'modal-prev-button',
        name: 'modal-prev-button',
        label: 'Geri',
        labelClassName: '',
        type: 'button',
        placeholder: '',
        pattern: '',
        extra: '',
        required: false,
        error: '',
        onClick: (() => { console.log('clicked') })
      }, {
        inputClassName: '',
        id: 'modal-next-button',
        name: 'modal-next-button',
        label: 'Ileri',
        labelClassName: '',
        type: 'button',
        placeholder: '',
        pattern: '',
        extra: '',
        required: false,
        error: '',
        onClick: (() => { console.log('clicked') })
      }
    ], [
      {
        inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
        id: 'service-point-city',
        name: 'service-point-city',
        label: 'Hizmet Noktasi Il',
        labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        type: 'dropdown',
        placeholder: '',
        pattern: '',
        extra: {
          items: cities,
        },
        required: true,
        error: 'Hizmet Noktasi Sehri Bos Birakilamaz.',
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
          dispatch(setSelectedCity(e.target.value));
        }
      }, {
        inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
        id: 'service-point-district',
        name: 'service-point-district',
        label: 'Hizmet Noktasi Ilce',
        labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        type: 'dropdown',
        placeholder: '',
        pattern: '',
        extra: {
          items: districts,
        },
        required: true,
        error: 'Hizmet Noktasi Ilce Bos Birakilamaz.',
      }, {
        inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
        id: 'service-point-payment-methods',
        name: 'service-point-payment-methods',
        label: 'Servis Noktasi Odeme Yontemleri',
        labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        type: 'dropdown',
        placeholder: '',
        pattern: '',
        extra: {
          items: ['Nakit', 'Kredi Karti', 'Banka Karti']
        },
        required: true,
        error: 'Hizmet Noktasi Odeme Yontemi Bos Birakilamaz'
      }, {
        inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
        id: 'service-point-parking',
        name: 'service-point-parking',
        label: 'Servis Noktasi Ucretsiz Park',
        labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        type: 'radio',
        placeholder: '',
        pattern: '',
        extra: '',
        required: false,
        error: ''
      }, {
        inputClassName: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 my-2 p-2.5',
        id: 'service-point-opportunity',
        name: 'service-point-opportunity',
        label: 'Hizmet Noktasi Olanaklari',
        labelClassName: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        type: 'checkbox',
        placeholder: '',
        pattern: '',
        extra: '',
        required: false,
        error: ''
      }, {
        inputClassName: '',
        id: 'modal-prev-button',
        name: 'modal-prev-button',
        label: 'Geri',
        labelClassName: '',
        type: 'button',
        placeholder: '',
        pattern: '',
        extra: '',
        required: false,
        error: '',
        onClick: (() => { console.log('clicked') })
      }, {
        inputClassName: '',
        id: 'modal-submit-button',
        name: 'modal-submit-button',
        label: 'Kaydet',
        labelClassName: '',
        type: 'submit',
        placeholder: '',
        pattern: '',
        extra: '',
        required: false,
        error: '',
        onClick: (() => { console.log('clicked') })
      }
    ]
  ];
  useEffect(() => {
    getCities();
  }, []);

  const getCities = async () => {
    try {
      const cityResponse = await axios.get('https://testapideneme.azurewebsites.net/Values/GetCities').then((response) => response.data);
      setCities(cityResponse.data);
      getDistricts();
    } catch (error) {
      console.log(error);
    }
  };

  const getDistricts = async () => {
    try {
      const districtResponse = await axios.post(`https://testapideneme.azurewebsites.net/Values/GetDistricts`, { 'plateNumber': Number(selectedCity) }).then((response) => response.data);
      setDistricts(districtResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`service-point-container flex justify-between items-center pt-12 flex-col`}>
      <Modal inputs={inputs} />
      <div className='flex items-center w-full'>
        <Table />
      </div>
    </div>
  );
};

export default ServicePointSection;
