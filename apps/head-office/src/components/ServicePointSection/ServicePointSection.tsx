import React from 'react';
import ServicePointModalForm from './ServicePointModalForm';
import Modal from '../Modal/Modal';
import Table from '../Table/Table';

export function ServicePointSection() {
  return (
    <div className={`service-point-container flex justify-between items-center pt-12 flex-col`}>
      <Modal modalId={'service-point-create-modal'}>
        <ServicePointModalForm />
      </Modal>
      <div className="service-point-table-container flex items-center w-full">
        <Table />
      </div>
    </div>
  );
};

export default ServicePointSection;
