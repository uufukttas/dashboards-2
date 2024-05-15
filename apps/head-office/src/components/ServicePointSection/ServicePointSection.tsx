import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@projects/alert';
import { Dialog } from '@projects/dialog';
import { initialServicePointDataValues, initialServicePointInformationValue } from './constants';
import Pagination from './PaginationComponents/Pagination';
import ServicePointModalForm from './ServicePointsModalComponents/ServicePointModal';
import Modal from '../Modal/Modal';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { deleteServicePointRequest, getAllServicePointsRequest } from '../../../app/api/servicePoints/index';
import { hideAlert, showAlert } from '../../../app/redux/features/alertInformation';
import { hideDialog } from '../../../app/redux/features/dialogInformation';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { toggleServicePointDataUpdated } from '../../../app/redux/features/isServicePointDataUpdated';
import { setServicePoints } from '../../../app/redux/features/servicePoints';
import { setServicePointData } from '../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../app/redux/features/servicePointInformation';
import { RootState, AppDispatch } from '../../../app/redux/store';
import type { IGetServicePointsProps, IResponseDataProps } from './types';
import './ServicePointSection.css';

const ServicePointSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
  const isServicePointDataUpdated = useSelector((state: RootState) => {
    return state.isServicePointDataUpdated.isServicePointDataUpdated
  });
  const [searchedText, setSearchedText] = useState<string>('');
  const servicePointsCount = useSelector((state: RootState) => state.servicePoints.count);
  const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);
  const servicePointsData = useSelector((state: RootState) => state.servicePoints.servicePoints);
  const [currentPage, setCurrentPage] = useState(1);

  const deleteServicePoint = async (deletedId: number): Promise<void> => {
    try {
      const { data } = await deleteServicePointRequest(deletedId);

      handleDeleteSuccess(data);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllServicePoints = async (): Promise<void> => {
    try {
      const response = await getAllServicePointsRequest(currentPage, searchedText);

      handleGetServicePointSuccess(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseModal = (): void => {
    dispatch(setServicePointData(initialServicePointDataValues));
    dispatch(setServicePointInformation(initialServicePointInformationValue));
    dispatch(toggleModalVisibility(false));
  };
  const handleDeleteSuccess = (data: IResponseDataProps): void => {
    dispatch(
      showAlert({
        message: data.message,
        type: data.success ? 'success' : 'error',
      })
    );

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  };
  const handleGetServicePointSuccess = (response: IGetServicePointsProps): void => {
    dispatch(setServicePoints(response));
    dispatch(toggleServicePointDataUpdated(false));
    dispatch(toggleLoadingVisibility(false));
  };

  useEffect(() => {
    getAllServicePoints();
  }, [isServicePointDataUpdated, currentPage]);

  return (
    <div className={`${BRAND_PREFIX}-service-points-container flex justify-between items-center flex-col`}>
      <div className={`${BRAND_PREFIX}-service-point-listing-container flex items-center w-full`}>
        <Table
          attributeName="service-point"
          searchedText={searchedText}
          tableData={servicePointsData}
          tableDataCount={servicePointsCount}
          tableHeadData={[
            'Servis Noktasi',
            'Telefon',
            'Adres',
            'Il',
            'Ilce',
            'Islemler',
          ]}
          setSearchedText={setSearchedText}
        />
      </div>
      {
        isModalVisible && (
          <Modal
            className={`${BRAND_PREFIX}-service-point-modal-container`}
            modalHeaderTitle={`Servis Noktasi ${servicePointData.id > 0 ? 'Güncelle' : 'Ekle'}`}
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
        servicePointsCount > 10 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCounts={servicePointsCount}
          />
        )
      }
    </div>
  );
};

export default ServicePointSection;
