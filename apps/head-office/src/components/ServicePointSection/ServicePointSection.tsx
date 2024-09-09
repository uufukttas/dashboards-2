import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Tooltip } from 'primereact/tooltip';
import { FaCircleInfo, FaPen, FaTrashCan } from 'react-icons/fa6';
import { useSelector, useDispatch } from 'react-redux';
import * as XLSX from 'xlsx';
import { Alert } from '@projects/alert';
import { Dialog } from '@projects/dialog';
import {
  initialServicePointDataValues,
  initialServicePointInformationValue,
  servicePointTableHeadData,
} from './constants';
import ServicePointModalForm from './ServicePointsModalComponents/ServicePointModal';
import Modal from '../Modal/Modal';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../constants/constants';
import {
  deleteServicePointRequest,
  getAllServicePointsRequest,
  getServicePointDataRequest,
  getServicePointInformationRequest
} from '../../../app/api/servicePoints';
import { hideAlert, showAlert } from '../../../app/redux/features/alertInformation';
import { hideDialog, showDialog } from '../../../app/redux/features/dialogInformation';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { toggleServicePointDataUpdated } from '../../../app/redux/features/isServicePointDataUpdated';
import { setServicePoints } from '../../../app/redux/features/servicePoints';
import { setServicePointData } from '../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../app/redux/features/servicePointInformation';
import { RootState, AppDispatch } from '../../../app/redux/store';
import type {
  IGetServicePointsProps,
  IPayloadProps,
  IResponseDataProps,
  IServicePoint,
  IServicePointData
} from './types';
import './ServicePointSection.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Toast } from 'primereact/toast';

const ServicePointSection: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-service-point`;
  const dispatch = useDispatch<AppDispatch>();
  const toastRef = useRef(null); // toastRef isminde güncellenmiş bir useRef
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
  const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
  const { isServicePointDataUpdated } = useSelector((state: RootState) => state.isServicePointDataUpdated);
  const searchProperties = useSelector((state: RootState) => state.searchedText);
  const servicePointsCount = useSelector((state: RootState) => state.servicePoints.count);
  const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);
  const servicePointsData = useSelector((state: RootState) => state.servicePoints.servicePoints);
  const [visibleColumns, setVisibleColumns] = useState(servicePointTableHeadData);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    },
    cityId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
    },
    districtId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
    },
    address: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
    },
    phoneNumber: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
    }
  };
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);



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

    payload.pageNumber = 1;
    payload.userCount = 100;

    return payload;
  };
  const dataTableHeader = (): JSX.Element => {
    return (
      <>
        <div className={`${BRAND_PREFIX}-data-table-header-container w-full flex justify-between items-center`}>
          <div className={`${BRAND_PREFIX}-data-table-select-container`}>
            <MultiSelect value={visibleColumns} options={servicePointTableHeadData.filter((item) => item.isRemovable)} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />
          </div>
          <div className={`${BRAND_PREFIX}-data-table-action-button-container flex justify-center items-center`}>
            <div className={`${BRAND_PREFIX}-data-table-export-button-container mx-4`}>
              <Button
                className={`${BRAND_PREFIX}-data-table-export-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
                data-pr-tooltip="XLS"
                icon="pi pi-file-excel"
                rounded
                severity="success"
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
                className={`${BRAND_PREFIX}-table-header-add-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
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
  const deleteServicePointInfo = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    dispatch(
      showDialog({
        actionType: 'delete',
        data: parseInt(event.currentTarget.getAttribute('data-service-point-id') || '0')
      })
    );
  };
  const deleteServicePoint = async (deletedId: number): Promise<void> => {
    const { data } = await deleteServicePointRequest(deletedId);

    handleDeleteServicePointSuccess(data);
  };
  const exportExcel = (): void => {
    const worksheet = XLSX.utils.json_to_sheet(servicePointsData)
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    saveAsExcelFile(excelBuffer, 'service-points');
  };
  const getAllServicePoints = async (): Promise<void> => {
    const response = await getAllServicePointsRequest(createGetServicePointsRequestPayload());

    handleGetServicePointSuccess(response);
  };
  const getUpdatedServicePointInfo = async (event: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
    const servicePointId: number = Number(event.currentTarget.getAttribute('data-service-point-id') || '0');
    const servicePointData = await getServicePointDataRequest(servicePointId);
    const servicePointInformation = await getServicePointInformationRequest(servicePointId);

    dispatch(setServicePointData(servicePointData.data[0] || {}));
    dispatch(setServicePointInformation(servicePointInformation.data[0] || {}));
    dispatch(toggleModalVisibility(true));
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
  const onColumnToggle = (event: MultiSelectChangeEvent): void => {
    const selectedColumns = event.target.value;
    const orderedSelectedColumns = servicePointTableHeadData
      .filter((col) => selectedColumns
        .some((sCol: { field: string; header: string; isRemovable: boolean }) => {
          return sCol.field === col.field
        }) || col.field === 'actions');

    setVisibleColumns(orderedSelectedColumns);
  };
  const prepareTableData = (): IServicePointData[] => {
    const newTableData = servicePointsData.map((data: IServicePoint) => {
      return {
        ...data,
        cityId: CITIES[data.cityId?.toString() as keyof typeof CITIES],
        districtId: DISTRICTS[data.districtId?.toString() as keyof typeof DISTRICTS || "0"]
      };
    });

    return newTableData;
  };
  const saveAsExcelFile = (buffer: ArrayBuffer, fileName: string): void => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const initFilters = () => {
    setFilters(defaultFilters);
    setGlobalFilterValue('');
  };

  useEffect(() => {
    getAllServicePoints();
  }, [isServicePointDataUpdated, searchProperties]);

  useEffect(() => {
    if (alertInformation.isVisible && toastRef.current) {
      // @ts-ignore
      toastRef.current.show({ severity: `${alertInformation.type}`, summary: `${alertInformation.message}` });
    }
  }, [alertInformation.isVisible]);

  useEffect(() => {
    if (servicePointsCount === 0) {
      dispatch(toggleLoadingVisibility(true));
    }

    getAllServicePoints();
  }, []);

  return (
    servicePointsCount > 1 &&
    <div className={`${BRAND_PREFIX}-service-points-container flex justify-between items-center flex-col`}>
      <div className={`${pagePrefix}-listing-container flex items-center w-full`}>
        <DataTable
          className="w-full shadow"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          filterDisplay="menu"
          filters={filters}
          header={dataTableHeader}
          globalFilterFields={['name', 'cityId', 'districtId', 'address', 'phoneNumber']}
          paginator={true}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
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
                            onClick={getUpdatedServicePointInfo}
                          >
                            <FaPen className='text-primary' />
                          </a>
                          <a
                            className="font-medium text-red-600 cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
                            data-service-point-id={rowData['id']}
                            onClick={deleteServicePointInfo}
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
                    headerClassName={``}
                    key={index}
                  />
                );
              }
            })
          }
        </DataTable>
      </div >
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
          <Toast ref={toastRef} />
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
    </div >
  );
};

export default ServicePointSection;
