import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@projects/alert';
import { Dialog } from '@projects/dialog';
import Pagination from './Pagination';
import ServicePointModalForm from './ServicePointModal';
import Modal from '../Modal/Modal';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { hideAlert, showAlert } from '../../../app/redux/features/alertInformation';
import { toggleServicePointDataUpdated } from '../../../app/redux/features/isServicePointDataUpdated';
import { hideDialog } from '../../../app/redux/features/dialogInformation';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState, AppDispatch } from '../../../app/redux/store';

export function ServicePointSection() {
  const dispatch = useDispatch<AppDispatch>();
  const alertInformation = useSelector((state: RootState) => state.alertInformationReducer);
  const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
  const isServicePointDataUpdated = useSelector((state: RootState) => state.isServicePointDataUpdatedReducer.isServicePointDataUpdated);
  const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicePointCount, setServicePointCount] = useState(0);
  const [servicePoints, setServicePoints] = useState([]);

  const deleteServicePoint = async (deletedId: number) => {
    try {
      await axios
        .post(
          process.env.DELETE_STATION_URL || '',
          ({
            'id': deletedId
          }))
        .then((response) => response.data)
        .then(response => {
          dispatch(showAlert({
            message: response.message,
            type: 'success',
          }));

          setTimeout(() => {
            dispatch(hideAlert());
          }, 5000);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  };

  const getFirstTenUsers = async () => {
    try {
      await axios
        .post(
          process.env.GET_ALL_SERVICE_POINTS || '',
          ({
            'pageNumber': currentPage,
            'userCount': 10
          })
        )
        .then((response) => response.data)
        .then(response => {
          setServicePointCount(response.count);
          setServicePoints(response.data);
          dispatch(toggleLoadingVisibility(false));
          dispatch(toggleServicePointDataUpdated(false));
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFirstTenUsers();
  }, [isServicePointDataUpdated, currentPage]);

  return (
    <div className={`${BRAND_PREFIX}-service-points-container flex justify-between items-center flex-col`}>
      <div className={`${BRAND_PREFIX}-service-point-listing-container flex items-center w-full`}>
        <Table
          servicePoints={servicePoints}
        />
      </div>
      {
        isModalVisible && (
          <Modal
            modalHeaderTitle={`Lokasyon ${servicePointData.id > 0 ? 'Güncelle' : 'Ekle'}`}
            modalId={`${BRAND_PREFIX}-service-point-modal`}
          >
            <ServicePointModalForm />
          </Modal>
        )
      }
      {
        alertInformation.isVisible && (
          <Alert
            alertText={alertInformation.message}
            alertType={alertInformation.type}
            id={`service-point-alert`}
          />
        )
      }
      {
        dialogInformation.isVisible && (
          <Dialog
            handleCancel={() => dispatch(hideDialog())}
            handleSuccess={() => {
              deleteServicePoint(dialogInformation.data);
              dispatch(hideDialog());
              dispatch(toggleServicePointDataUpdated(true));
            }}
          />
        )
      }
      {
        servicePointCount > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(servicePointCount / 10)}
            setCurrentPage={setCurrentPage}
          />
        )
      }
    </div>
  );
};

export default ServicePointSection;
