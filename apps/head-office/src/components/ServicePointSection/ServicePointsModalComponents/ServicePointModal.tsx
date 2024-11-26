import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import { IModalLayoutProps } from '../../Modal/Layouts/ModalLayout.interface';
import ServicePointModalFormFirstPage from './ServicePointModalFormPages/ServicePointModalFormFirstPage';
import ServicePointModalFormFourthPage from './ServicePointModalFormPages/ServicePointModalFormFourthPage';
import ServicePointModalFormSecondPage from './ServicePointModalFormPages/ServicePointModalFormSecondPage';
import ServicePointModalFormThirdPage from './ServicePointModalFormPages/ServicePointModalFormThirdPage';

const ServicePointModalForm: React.FC = () => {
  const [activePage, setActivePage] = useState(1);

  const form = useForm({
    defaultValues: {
      name: '',
      company: null,
      ressler: 1,
      phone1: null,
      phone2: null,
      address: null,
      'address-detail': null,
      'free-park-count': null,
      opportunities: [],
      'payment-methods': [],
      lat: 0,
      lon: 0,
    },
  });

  const modalConfig: IModalLayoutProps = {
    name: 'add-service-point',
    title: 'Yeni İstasyon Ekle',
  };

  return (
    <ModalLayout {...modalConfig}>
      {activePage === 1 && (
        <ServicePointModalFormFirstPage form={form} activePage={activePage} setActivePage={setActivePage} />
      )}
      {activePage === 2 && (
        <ServicePointModalFormSecondPage form={form} activePage={activePage} setActivePage={setActivePage} />
      )}
      {activePage === 3 && (
        <ServicePointModalFormThirdPage form={form} activePage={activePage} setActivePage={setActivePage} />
      )}
      {activePage === 4 && (
        <ServicePointModalFormFourthPage form={form} activePage={activePage} setActivePage={setActivePage} />
      )}
    </ModalLayout>
  );
};

export default ServicePointModalForm;
