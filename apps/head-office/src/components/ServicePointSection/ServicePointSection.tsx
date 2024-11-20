import { useGetServicePointsMutation } from 'apps/head-office/app/api/services/service-points/servicePoints.service';
import { useRouter } from 'next/router';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useRef, useState } from 'react';
import { FaCircleInfo, FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import {
  deleteServicePointRequest,
  getServicePointDataRequest,
  getServicePointInformationRequest,
} from '../../../app/api/servicePoints';
import { hideAlert, showAlert } from '../../../app/redux/features/alertInformation';
import { showDialog } from '../../../app/redux/features/dialogInformation';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { setServicePointData } from '../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../app/redux/features/servicePointInformation';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../constants/constants';
import { BaseTable } from '../BaseTable/BaseTable';
import {
  initialServicePointDataValues,
  initialServicePointInformationValue,
  servicePointTableHeadData,
} from './constants';
import './ServicePointSection.css';
import type { IPayloadProps, IResponseDataProps, IRowDataProps, ISelectedColumnProps } from './types';

const ServicePointSection: React.FC = () => {
  const defaultFilters: DataTableFilterMeta = {
    address: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    cityId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    districtId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    global: {
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    phoneNumber: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  };
  const pagePrefix: string = `${BRAND_PREFIX}-service-point`;
  const dispatch = useDispatch<AppDispatch>();
  const toastRef = useRef(null);
  const router = useRouter();
  const [getServicePoints, { data: servicePoints }] = useGetServicePointsMutation();
  const alertInformation = useSelector((state: RootState) => state.alertInformation);
  const searchProperties = useSelector((state: RootState) => state.searchedText);
  const servicePointsCount = useSelector((state: RootState) => state.servicePoints.count);
  const servicePointsData = useSelector((state: RootState) => state.servicePoints.servicePoints);
  const [isUpdatedServicePointData, setIsUpdatedServicePointData] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(servicePointTableHeadData);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  const actionsButtonsContainer = (rowData: IRowDataProps): React.JSX.Element => {
    return (
      <div className={`${pagePrefix}-data-table-actions-button-container flex justify-start items-center`}>
        <a
          className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
          data-service-point-id={rowData['id']}
          onClick={getUpdatedServicePointInfo}
        >
          <FaPen className="text-primary text-2xl" />
        </a>
        <a
          className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
          data-service-point-id={rowData['id']}
          onClick={deleteServicePointInfo}
        >
          <FaTrashCan className="text-2xl" />
        </a>
        {rowData?.address && rowData?.districtId && rowData?.cityId && rowData?.phone && (
          <button
            className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
            onClick={() => {
              router.push(`/service-points/service-point/${rowData.id}`);
            }}
          >
            <FaCircleInfo className="text-2xl" />
          </button>
        )}
      </div>
    );
  };
  const createGetServicePointsRequestPayload = (): IPayloadProps => {
    const payload: IPayloadProps = {};

    searchProperties.searchedConditions.map((condition: string) => {
      switch (condition) {
        case 'İstasyon Adı':
          payload['name'] = searchProperties.searchedText;
          break;
        case 'Telefon':
          payload['phone'] = searchProperties.searchedText;
          break;
        case 'Adres':
          payload['address'] = searchProperties.searchedText;
          break;
        case 'İl':
          payload['cityName'] = searchProperties.searchedText;
          break;
        case 'İlçe':
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
    const tablePrefix: string = `${pagePrefix}-data-table`;

    return (
      <div className={`${tablePrefix}-header-container w-full flex justify-between items-center`}>
        <div className={`${tablePrefix}-header-filter-container flex justify-start items-center`}>
          <div className={`${tablePrefix}-select-container mx-4`}>
            <MultiSelect
              className={`${tablePrefix}-header-column-name-selection w-full sm:w-20rem`}
              placeholder="Sütunları Seç"
              optionLabel="header"
              options={servicePointTableHeadData.filter((item) => item.isRemovable)}
              value={visibleColumns}
              onChange={onColumnToggle}
            />
          </div>
          <div className={`${tablePrefix}-global-filter-input-container flex justify-content-end`}>
            <InputText
              className={`${tablePrefix}-global-filter-input p-2.5 border border-gray-200 rounded-md`}
              placeholder="Ara..."
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
            />
          </div>
        </div>
        <div className={`${tablePrefix}-header-action-buttons-container flex justify-center items-center`}>
          <div className={`${tablePrefix}-export-button-container mx-4`}>
            <Button
              className={`${tablePrefix}-export-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
              icon="pi pi-file-excel"
              id={`${tablePrefix}-export-button`}
              rounded
              severity="success"
              type="button"
              onClick={exportExcel}
            />
            <Tooltip
              className={`${tablePrefix}-export-button-tooltip text-base`}
              content="Dışarı Aktar"
              position="bottom"
              target={`#${tablePrefix}-export-button`}
              style={{
                fontSize: '12px',
                padding: '4px',
              }}
            />
          </div>
          <div className={`${tablePrefix}-add-button-container mx-4`}>
            <Button
              className={`${tablePrefix}-add-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
              icon="pi pi-plus"
              id={`${tablePrefix}-add-button`}
              rounded
              type="button"
              onClick={() => dispatch(toggleModalVisibility(true))}
            />
            <Tooltip
              className={`${tablePrefix}-add-button-tooltip text-base`}
              content="İstasyon Ekle"
              position="bottom"
              target={`#${tablePrefix}-add-button`}
              style={{
                fontSize: '12px',
                padding: '4px',
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const deleteServicePointInfo = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    dispatch(
      showDialog({
        actionType: 'delete',
        data: parseInt(event.currentTarget.getAttribute('data-service-point-id') || '0'),
      }),
    );
  };

  const deleteServicePoint = async (deletedId: number): Promise<void> => {
    const { data } = await deleteServicePointRequest(deletedId);

    handleDeleteServicePointSuccess(data);
  };
  const exportExcel = (): void => {
    const worksheet = XLSX.utils.json_to_sheet(servicePointsData);
    const workbook = {
      Sheets: {
        data: worksheet,
      },
      SheetNames: ['data'],
    };
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    saveAsExcelFile(excelBuffer, 'service-points');
  };
  const getUpdatedServicePointInfo = async (event: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
    setIsUpdatedServicePointData(true);

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

    setIsUpdatedServicePointData(false);
  };

  const handleDeleteServicePointSuccess = (data: IResponseDataProps): void => {
    dispatch(
      showAlert({
        message: data.message,
        type: data.success ? 'success' : 'error',
      }),
    );

    setTimeout(() => {
      dispatch(hideAlert());
    }, 5000);
  };
  const onColumnToggle = (event: MultiSelectChangeEvent): void => {
    const selectedColumns = event.target.value;
    const orderedSelectedColumns = servicePointTableHeadData.filter(
      (col) =>
        selectedColumns.some((sCol: ISelectedColumnProps) => {
          return sCol.field === col.field;
        }) || col.field === 'actions',
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const prepareTableData = () => {
    const newTableData = servicePoints?.map((data) => {
      return {
        ...data,
        cityId: CITIES[data.cityId?.toString() as keyof typeof CITIES],
        districtId: DISTRICTS[(data.districtId?.toString() as keyof typeof DISTRICTS) || '0'],
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
          type: EXCEL_TYPE,
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

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
    if (alertInformation.isVisible && toastRef.current) {
      // @ts-ignore
      toastRef.current.show({ severity: `${alertInformation.type}`, summary: `${alertInformation.message}` });
    }
  }, [alertInformation.isVisible]);

  useEffect(() => {
    if (servicePointsCount === 0) {
      dispatch(toggleLoadingVisibility(true));
    }

    initFilters();
  }, [servicePointsCount]);

  useEffect(() => {
    getServicePoints({
      body: createGetServicePointsRequestPayload(),
    });
  }, []);

  return (
    <div className={`${BRAND_PREFIX}-service-points-container flex justify-between items-center flex-col`}>
      <BaseTable columns={visibleColumns} data={prepareTableData()} />
    </div>
  );
};

export default ServicePointSection;
