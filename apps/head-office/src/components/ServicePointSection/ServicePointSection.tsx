import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import Table from '../Table/Table';
import ServicePointModalForm from './ServicePointModalForm';
import { RootState } from '../../../app/redux/store';

export function ServicePointSection() {
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);

  return (
    <div className={`sh-service-point-container flex justify-between items-center pt-6 md:pt-12 flex-col`}>
      <div className="sh-service-point-table-container flex items-center w-full">
        <Table />
      </div>
      {
        isModalVisible &&
        <Modal modalId={'sh-service-point-create-modal'}>
          <ServicePointModalForm />
        </Modal>
      }
    </div>
  );
};

export default ServicePointSection;
