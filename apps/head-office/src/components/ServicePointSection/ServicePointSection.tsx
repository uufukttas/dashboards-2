import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@projects/alert';
import Modal from '../Modal/Modal';
import Table from '../Table/Table';
import ServicePointModalForm from './ServicePointModalForm';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleAlertVisibility } from '../../../app/redux/features/isAlertVisible';
import { RootState } from '../../../app/redux/store';

export function ServicePointSection() {
  const isAlertVisible = useSelector((state: RootState) => state.isAlertVisibleReducer.isAlertVisible);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
  const dispatch = useDispatch();

  return (
    <div className={`${BRAND_PREFIX}-service-point-container flex justify-between items-center pt-6 md:pt-12 flex-col`}>
      <div className={`${BRAND_PREFIX}-service-point-table-container flex items-center w-full`}>
        <Table />
      </div>
      {
        isModalVisible &&
        <Modal modalId={`${BRAND_PREFIX}-service-point-modal`}>
          <ServicePointModalForm />
        </Modal>
      }
      {
        isAlertVisible &&
        <Alert
          alertText={'Servis Noktasi Olusurken Bir Hata Olustu'}
          id={`service-point-alert`}
          onClick={() => dispatch(toggleAlertVisibility(false))}
        />
      }
    </div>
  );
};

export default ServicePointSection;
