import React, { useState, useEffect } from 'react';
import { FaCircleInfo, FaPen, FaPlus, FaTrashCan } from 'react-icons/fa6';
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
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  // @ts-expect-error
  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    
    // @ts-expect-error
    let orderedSelectedColumns = servicePointTableHeadData.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

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
            <MultiSelect value={visibleColumns} options={visibleColumns} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />
          </div>
          <div className={`${BRAND_PREFIX}-data-table-export-button-container`}>
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS">
              <>
                <Tooltip
                  className={`${BRAND_PREFIX}-data-table-add-button-tooltip text-base`}
                  content="Istasyon Ekle"
                  position="left"
                  target={`#${BRAND_PREFIX}-table-header-add-button`}
                />
                <FaPlus />
              </>
            </Button>
          </div>
          <div className={`${BRAND_PREFIX}-data-table-add-button-container`}>
            <Button
              className={`${BRAND_PREFIX}-table-header-add-button flex justify-end items-center bg-primary rounded text-base font-semibold hover:bg-primary-lighter p-2`}
              id={`${BRAND_PREFIX}-table-header-add-button`}
              type="button"
              onClick={() => toggleModalVisibility(true)}
            >
              <span className='flex justify-center items-center'>
                {
                  <>
                    <Tooltip
                      className={`${BRAND_PREFIX}-data-table-add-button-tooltip text-base`}
                      content="Istasyon Ekle"
                      position="left"
                      target={`#${BRAND_PREFIX}-table-header-add-button`}
                    />
                    <FaPlus />
                  </>
                }
              </span>
            </Button>
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
        <DataTable
          className="w-full"
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
          value={servicePointsData}
        >
          {
            visibleColumns.map((headerProps, index) => {
              if (headerProps.field !== "actions") {
                return (
                  <Column
                    className='border border-gray-300'
                    field={headerProps.field}
                    filter
                    filterPlaceholder={`Search by ${headerProps.header}`}
                    header={headerProps.header}
                    key={index}
                    sortable={true}
                  />
                );
              } else {
                return (
                  <Column
                    body={
                      <div className={`${BRAND_PREFIX}-data-table-actions-button-container flex justify-start items-center`}>
                        <a className="font-medium text-blue-600 cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
                        // {...dataAttributes}
                        // onClick={(event) => {
                        //   attributeName.indexOf('service-point') > -1
                        //     ? getUpdatedServicePointInfo(event)
                        //     : getUpdatedUserInfo(event)
                        // }}
                        >
                          <FaPen className='text-primary' />
                        </a>
                        <a
                          className="font-medium text-red-600 cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
                        // onClick={(event) => {
                        //   if (attributeName === 'service-point') {
                        //     deleteServicePointInfo(event)
                        //   } else if (attributeName === 'user-management') {
                        //     deleteUserRequest(event)
                        //   } else if (attributeName === 'tariff-list') {
                        //     deleteTariffRequest(event)
                        //   }
                        // }}
                        // {...dataAttributes}
                        >
                          <FaTrashCan />
                        </a>
                        <Link
                          href=""
                          className='font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"'
                        // className='px-4 hover:scale-125 transition-transform duration-300 ease-in-out'
                        // href={`/service-points/service-point/${tableCellData?.id}`
                        // }
                        >
                          <FaCircleInfo className={`text-blue-700`} />
                        </Link >
                      </div>
                    }
                    className={`border border-gray-300`}
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
