// @ts-nocheck

import React, { useState, useEffect } from 'react';
import { FaCircleInfo, FaPen, FaPlus, FaTrashCan } from 'react-icons/fa6';
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from '@projects/alert';
// import { Button } from '@projects/button';
import { Dialog } from '@projects/dialog';
import {
  initialServicePointDataValues,
  initialServicePointInformationValue,
  servicePointTableFilteredDropdownItems,
  servicePointTableHeadData,
} from './constants';
import Pagination from './PaginationComponents/Pagination';
import ServicePointModalForm from './ServicePointsModalComponents/ServicePointModal';
import Modal from '../Modal/Modal';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../constants/constants';
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
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Link from 'next/link';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { MultiSelect } from 'primereact/multiselect';

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
console.log(CITIES)
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    cityId: { value: null, matchMode: FilterMatchMode.CONTAINS },
    districtId: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phoneNumber: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(servicePointTableHeadData);

  // @ts-expect-error
  // const onGlobalFilterChange = (e) => {
  //   const value = e.target.value;
  //   const _filters = { ...filters };

  //   _filters['global'].value = value;

  //   setFilters(_filters);
  //   setGlobalFilterValue(value);
  // };

  const onColumnToggle = (event) => {
    const selectedColumns = event.value;
    const orderedSelectedColumns = servicePointTableHeadData.filter((col) => selectedColumns.some((sCol: any) => sCol.field === col.field) || col.field === 'actions');

    setVisibleColumns(orderedSelectedColumns);
  };
  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(Array.isArray(servicePointData) ? servicePointData : [servicePointData]);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      saveAsExcelFile(excelBuffer, 'products');
    });
  };

  // @ts-expect-error
  const saveAsExcelFile = (buffer, fileName) => {
    // @ts-expect-error
    fileSaver.then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };

  const dataTableHeader = () => {
    return (
      <>
        <div className={`${BRAND_PREFIX}-data-table-header-container w-full flex justify-between items-center`}>
          <div className={`${BRAND_PREFIX}-data-table-select-container`}>
            <MultiSelect value={visibleColumns} options={servicePointTableHeadData.filter((item) => item.isRemovable)} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />
          </div>
          <div className={`${BRAND_PREFIX}-data-table-action-button-container flex justify-center items-center`}>
            <div className={`${BRAND_PREFIX}-data-table-export-button-container mx-4`}>
              <Button
                className={`${BRAND_PREFIX}-table-header-add-button flex justify-center items-center bg-primary rounded text-base font-semibold hover:bg-primary-lighter p-2`}
                icon="pi pi-file-excel"
                id={`${BRAND_PREFIX}-table-header-export-button`}
                rounded
                type="button"
                onClick={exportExcel}
              />
              <Tooltip
                className={`${BRAND_PREFIX}-data-table-export-button-tooltip text-base`}
                content="Disari Aktar"
                position="bottom"
                target={`#${BRAND_PREFIX}-table-header-export-button`}
                style={{ fontSize: '12px', padding: '4px' }}
              />
            </div>
            <div className={`${BRAND_PREFIX}-data-table-add-button-container mx-4`}>
              <Button
                className={`${BRAND_PREFIX}-table-header-add-button flex justify-center items-center bg-primary rounded text-base font-semibold hover:bg-primary-lighter p-2`}
                icon="pi pi-plus"
                id={`${BRAND_PREFIX}-table-header-add-button`}
                rounded
                type="button"
                onClick={() => dispatch(toggleModalVisibility(true))}
              />
              <Tooltip
                className={`${BRAND_PREFIX}-data-table-add-button-tooltip text-base`}
                content="Istasyon Ekle"
                position="bottom"
                target={`#${BRAND_PREFIX}-table-header-add-button`}
                style={{ fontSize: '12px', padding: '4px' }}
              />
            </div>
          </div>
        </div>
      </>
    )
  };
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

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
    payload.userCount = 20;

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

  const prepareTableData = () => {
    // Yeni bir dizi oluştur ve her öğe için yapılan değişikliklerle yeni bir dizi döndür
    // @ts-expect-error will delete
    const newTableData = servicePointsData.map((data: any) => {
      // Her data objesi için yeni bir kopya oluştur ve gerekli alanları güncelle
      return {
        ...data,
        cityId: CITIES[data.cityId?.toString()],  // City ID'yi güncelle
        districtId: DISTRICTS[data.districtId?.toString() || "0"]  // District ID'yi güncelle, districtId yoksa "0" kullan
      };
    });
  
    return newTableData; // Güncellenmiş veriyi döndür
  };

  useEffect(() => {
    getAllServicePoints();
  }, []);

  useEffect(() => {
    getAllServicePoints();
  }, [currentPage, isServicePointDataUpdated, searchProperties]);

  return (
    servicePointsCount > 1 &&
    <div className={`${BRAND_PREFIX}-service-points-container flex justify-between items-center flex-col`}>
      <div className={`${pagePrefix}-listing-container flex items-center w-full`}>
        <DataTable
          className="w-full shadow"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          filterDisplay="row"
          filters={filters}
          header={dataTableHeader}
          globalFilterFields={['name', 'cityId', 'districtId', 'address', 'phoneNumber']}
          paginator={true}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          removableSort
          reorderableColumns
          resizableColumns
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          showGridlines={true}
          sortMode="multiple"
          stripedRows={true}
          value={prepareTableData()}
        >
          {
            visibleColumns.map((headerProps, index) => {
              if (headerProps.field !== "actions") {
                return (
                  <Column
                    className='border-none'
                    field={headerProps.field}
                    filter
                    filterMenuClassName='border-none shadow-lg'
                    filterPlaceholder={`${headerProps.header}...`}
                    header={headerProps.header}
                    headerClassName='border-0'
                    key={index}
                    sortable={true}
                  />
                );
              } else {
                return (
                  <Column
                    body={(rowData) => {
                      return (
                        <div className={`${BRAND_PREFIX}-data-table-actions-button-container flex justify-start items-center`}>
                          <a
                            className="font-medium text-blue-600 cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
                            data-service-point-id={rowData['id']}
                          >
                            <FaPen className='text-primary' />
                          </a>
                          <a
                            className="font-medium text-red-600 cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
                            data-service-point-id={rowData['id']}
                          >
                            <FaTrashCan />
                          </a>
                          {
                            (rowData?.address && rowData?.districtId && rowData?.cityId && rowData?.phone) && (
                              <Link
                                className='font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"'
                                href={`/service-points/service-point/${rowData.id}`}
                              >
                                <FaCircleInfo className={`text-blue-700`} />
                              </Link >
                            )
                          }
                        </div>
                      )
                    }}
                    field={headerProps.field}
                    frozen
                    header={headerProps.header}
                    headerClassName={`flex justify-start items-center`}
                    key={index}
                  />
                );
              }
            })
          }
        </DataTable>
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
