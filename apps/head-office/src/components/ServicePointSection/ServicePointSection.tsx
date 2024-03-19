import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@projects/alert';
import { Dialog } from '@projects/dialog';
import ServicePointModalForm from './ServicePointModal';
import Modal from '../Modal/Modal';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { hideAlert, showAlert } from '../../../app/redux/features/alertInformation';
import { toggleDialogVisibility } from '../../../app/redux/features/isDialogVisible';
import { RootState } from '../../../app/redux/store';

export function ServicePointSection() {
  const alertInformation = useSelector((state: RootState) => state.alertInformationReducer);
  const isDialogVisible = useSelector((state: RootState) => state.isDialogVisibleReducer.isDialogVisible);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
  const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);
  const [deletedServicePointId, setDeletedServicePointId] = useState(0);
  const dispatch = useDispatch();

  const deleteServicePoint = async () => {
    try {
      await axios.post(
        process.env.DELETE_STATION_URL || '', ({
          'id': Number(deletedServicePointId)
        }))
        .then((response) => response.data)
        .then(response => {
          dispatch(showAlert({
            message: response.message,
            type: 'success',
          }))
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${BRAND_PREFIX}-service-point-container flex justify-between items-center flex-col`}>
      <div className={`${BRAND_PREFIX}-service-point-table-container flex items-center w-full`}>
        <Table
          deletedServicePointId={deletedServicePointId}
          setDeletedServicePointId={setDeletedServicePointId}
        />
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
      {
        isDialogVisible &&
        <Dialog
          handleCancel={() => dispatch(toggleDialogVisibility())}
          handleSuccess={() => {
            deleteServicePoint();
            dispatch(toggleDialogVisibility())
          }}
        />
      }
    </div>
  );
};

export default ServicePointSection;
