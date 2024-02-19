import Modal from '../Modal/Modal';
import Table from '../Table/Table';
import React from 'react';
import ServicePointModalForm from './ServicePointModalForm';

export interface ServicePointSectionProps {
  children?: React.ReactNode;
};

export function ServicePointSection() {
  return (
    <div className={`service-point-container flex justify-between items-center pt-12 flex-col`}>
      <Modal modalId={"service-point-create-modal"}>
        <ServicePointModalForm />
      </Modal>
      <div className='flex items-center w-full'>
        <Table />
      </div>
    </div>
  );
};

export default ServicePointSection;
