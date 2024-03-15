import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@projects/alert';
import ServicePointModalForm from './ServicePointModal';
import Modal from '../Modal/Modal';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { hideAlert } from '../../../app/redux/features/alertInformation';
import { RootState } from '../../../app/redux/store';

export function ServicePointSection() {
  const alertInformation = useSelector((state: RootState) => state.alertInformationReducer);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
  const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);
  const dispatch = useDispatch();

  return (
    <div className={`${BRAND_PREFIX}-service-point-container flex justify-between items-center flex-col`}>
      <div className={`${BRAND_PREFIX}-service-point-table-container flex items-center w-full`}>
        <Table />
      </div>
      {
        isModalVisible &&
        <Modal
          modalHeaderTitle={`Lokasyon ${servicePointData.id > 0 ? 'Güncelle' : 'Ekle'}`}
          modalId={`${BRAND_PREFIX}-service-point-modal`}
        >
          <ServicePointModalForm />
        </Modal>
      }
      {
        alertInformation.isVisible && (
          <Alert
            alertText={alertInformation.message}
            alertType={alertInformation.type}
            id={`service-point-alert`}
            onClick={() => dispatch(hideAlert())}
          />
        )
      }
    </div>
  );
};

export default ServicePointSection;
