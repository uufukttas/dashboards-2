import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@projects/alert';
import { Dialog } from '@projects/dialog';
import Pagination from './PaginationComponents/Pagination';
import ServicePointModalForm from './ServicePointsModalComponents/ServicePointModal';
import Modal from '../Modal/Modal';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { hideAlert, showAlert } from '../../../app/redux/features/alertInformation';
import { hideDialog } from '../../../app/redux/features/dialogInformation';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { toggleServicePointDataUpdated } from '../../../app/redux/features/isServicePointDataUpdated';
import { setServicePointData } from '../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../app/redux/features/servicePointInformation';
import { RootState, AppDispatch } from '../../../app/redux/store';

const ServicePointSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
  const isServicePointDataUpdated = useSelector((state: RootState) => {
    return state.isServicePointDataUpdated.isServicePointDataUpdated
  });
  const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicePointCount, setServicePointCount] = useState(0);
  const [servicePoints, setServicePoints] = useState([]);

  const deleteServicePoint = async (deletedId: number) => {
    try {
      await axios
        .post(
          process.env.DELETE_STATION_URL || '',
          ({ 'id': deletedId })
        )
        .then((response) => response.data)
        .then(response => {
          dispatch
            (showAlert({
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
            'userCount': 10,
          })
        )
        .then((response) => response.data)
        .then(response => {
          setServicePointCount(response.count);
          setServicePoints(response.data);
          dispatch(toggleServicePointDataUpdated(false));
          dispatch(toggleLoadingVisibility(false));
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseModal = () => {
    const servicePointDataInitialValues = {
      id: 0,
      isActive: true,
      isDeleted: false,
      name: '',
      companyId: 0,
      companyName: '',
      resellerCompanyId: 0,
      resellerName: '',
    };
    const servicePointInformationInitialValues = {
      address: '',
      cityId: 0,
      districtId: 0,
      freePark: false,
      id: 0,
      lon: 0,
      lat: 0,
      name: '',
      opportunities: [],
      paymentMethods: '1',
      phone1: '',
      phone2: '',
      type: '',
    };

    dispatch(setServicePointData(servicePointDataInitialValues));
    dispatch(setServicePointInformation(servicePointInformationInitialValues));
  }

  useEffect(() => {
    getFirstTenUsers();
  }, [isServicePointDataUpdated, currentPage]);

  return (
    <div className={`${BRAND_PREFIX}-service-points-container flex justify-between items-center flex-col`}>
      <div className={`${BRAND_PREFIX}-service-point-listing-container flex items-center w-full`}>
        <Table servicePoints={servicePoints} />
      </div>
      {
        isModalVisible && (
          <Modal
            className={`${BRAND_PREFIX}-service-point-modal-container`}
            modalHeaderTitle={`Lokasyon ${servicePointData.id > 0 ? 'Güncelle' : 'Ekle'}`}
            modalId={`${BRAND_PREFIX}-service-point-modal`}
            onClose={handleCloseModal}
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
            setCurrentPage={setCurrentPage}
            totalCounts={servicePointCount}
          />
        )
      }
    </div>
  );
};

export default ServicePointSection;
