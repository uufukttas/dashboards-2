import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@projects/alert';
import { Button } from '@projects/button';
import { Dialog } from '@projects/dialog';
import {
  initialServicePointDataValues,
  initialServicePointInformationValue,
  servicePointTableFilteredDropdownItems,
  servicePointTableHeadData,
  tablePlaceholderInitialValue,
} from './constants';
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
import { setSearchProperties } from '../../../app/redux/features/searchProperties';
import { setServicePoints } from '../../../app/redux/features/servicePoints';
import { setServicePointData } from '../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../app/redux/features/servicePointInformation';
import { RootState, AppDispatch } from '../../../app/redux/store';
import type { IGetServicePointsProps, IPayloadProps, IResponseDataProps } from './types';
import './ServicePointSection.css';

const ServicePointSection: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-service-point`;
  const dispatch = useDispatch<AppDispatch>();
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
  const isServicePointDataUpdated = useSelector((state: RootState) => {
    return state.isServicePointDataUpdated.isServicePointDataUpdated
  });
  const searchProperties = useSelector((state: RootState) => state.searchedText);
  const servicePointsCount = useSelector((state: RootState) => state.servicePoints.count);
  const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);
  const servicePointsData = useSelector((state: RootState) => state.servicePoints.servicePoints);
  const [currentPage, setCurrentPage] = useState(1);

  const addStationButton = (): React.ReactNode => {
    return (
      <Button
        className={`${BRAND_PREFIX}-table-header-add-button w-full bg-primary rounded-md text-base font-semibold hover:bg-primary-lighter px-2 py-2`}
        id={`${BRAND_PREFIX}-table-header-add-button`}
        type="button"
        onClick={() => toggleModalVisibility(true)}
      >
        <span className='flex justify-center items-center'>
          {
            <>
              <FaPlus className="mr-2" />
              Istasyon Ekle
            </>
          }
        </span>
      </Button>
    );
  };
  const createGetServicePointsRequestPayload = (): IPayloadProps => {
    const payload: IPayloadProps = {};

    searchProperties.searchedConditions.map((condition: string) => {
      switch (condition) {
        case 'Istasyon Adi':
          payload['name'] = searchProperties.searchedText;
          break;
        case 'Telefon':
          payload['phone'] = searchProperties.searchedText;
          break;
        case 'Adres':
          payload['address'] = searchProperties.searchedText;
          break;
        case 'Il':
          payload['cityName'] = searchProperties.searchedText;
          break;
        case 'Ilce':
          payload['districtName'] = searchProperties.searchedText;
          break;
        default:
          payload['name'] = searchProperties.searchedText;
          break;
      }
    });

    payload.pageNumber = currentPage;
    payload.userCount = 10;

    return payload;
  };
  const deleteServicePoint = async (deletedId: number): Promise<void> => {
    const { data } = await deleteServicePointRequest(deletedId);

    handleDeleteServicePointSuccess(data);
  };
  const getAllServicePoints = async (): Promise<void> => {
    const response = await getAllServicePointsRequest(createGetServicePointsRequestPayload());

    handleGetServicePointSuccess(response);
  };
  const handleCloseModal = (): void => {
    dispatch(setServicePointData(initialServicePointDataValues));
    dispatch(setServicePointInformation(initialServicePointInformationValue));
    dispatch(toggleModalVisibility(false));
  };
  const handleDeleteServicePointSuccess = (data: IResponseDataProps): void => {
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
    dispatch(
      setSearchProperties({
        searchedConditions: [],
        searchedText: '',
      })
    );
  }, []);

  useEffect(() => {
    getAllServicePoints();
  }, [currentPage, isServicePointDataUpdated, searchProperties]);

  return (
    <div className={`${BRAND_PREFIX}-service-points-container flex justify-between items-center flex-col`}>
      <div className={`${pagePrefix}-listing-container flex items-center w-full`}>
        <Table
          attributeName="service-point"
          className={`w-full`}
          filteredDropdownItems={servicePointTableFilteredDropdownItems}
          hasFilterData={true}
          tableData={servicePointsData}
          tableDataCount={servicePointsCount}
          tableHeader={addStationButton()}
          tableHeadData={servicePointTableHeadData}
          tablePlaceholderInitialValue={tablePlaceholderInitialValue}
        />
      </div>
      {
        isModalVisible && (
          <Modal
            className={`${pagePrefix}-modal-container`}
            modalHeaderTitle={`Istasyon ${servicePointData.id > 0 ? 'Güncelle' : 'Ekle'}`}
            modalId={`${pagePrefix}-modal`}
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
            id={`${pagePrefix}-alert`}
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
            totalCounts={servicePointsCount}
            setCurrentPage={setCurrentPage}
          />
        )
      }
    </div>
  );
};

export default ServicePointSection;
