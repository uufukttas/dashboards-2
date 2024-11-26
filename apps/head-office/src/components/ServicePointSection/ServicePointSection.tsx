import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useState } from 'react';
import { FaCircleInfo, FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { getServicePointDataRequest, getServicePointInformationRequest } from '../../../app/api/servicePoints';
import {
  useDeleteServicePointMutation,
  useGetServicePointsMutation,
} from '../../../app/api/services/service-points/servicePoints.service';
import { showDialog } from '../../../app/redux/features/dialogInformation';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { setServicePointData } from '../../../app/redux/features/servicePointData';
import { setServicePointInformation } from '../../../app/redux/features/servicePointInformation';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../constants/constants';
import { BaseTable } from '../BaseTable/BaseTable';
import { servicePointTableDefaultFilters, servicePointTableHeadData } from './constants';
import './ServicePointSection.css';
import type { IPayloadProps, IRowDataProps } from './types';

const ServicePointSection: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-service-point`;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [getServicePoints, { data: servicePoints }] = useGetServicePointsMutation();
  const [deleteServicePoint] = useDeleteServicePointMutation();

  const searchProperties = useSelector((state: RootState) => state.searchedText);
  const [visibleColumns, setVisibleColumns] = useState(servicePointTableHeadData);
  const [filters, setFilters] = useState(servicePointTableDefaultFilters);

  const actionsButtonsContainer = (rowData: IRowDataProps): JSX.Element => {
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

  const prepareTableData = () => {
    const newTableData = servicePoints?.map((data) => {
      return {
        ...data,
        city: CITIES[data.cityId?.toString() as keyof typeof CITIES],
        district: DISTRICTS[(data.districtId?.toString() as keyof typeof DISTRICTS) || '0'],
      };
    });

    return newTableData;
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
      <div className={`${tablePrefix}-header-container flex justify-between items-center`}>
        <div className={`${tablePrefix}-header-filter-container flex justify-start items-center`}>
          <div className={`${tablePrefix}-header-select-container mx-4`}>
            <MultiSelect
              className={`${tablePrefix}-header-column-name-selection w-full sm:w-20rem`}
              placeholder="Sütunları Seç"
              optionLabel="header"
              options={servicePointTableHeadData.filter((item) => item.isRemovable)}
              value={visibleColumns}
              onChange={onColumnToggle}
            />
          </div>
        </div>
        <div className={`${tablePrefix}-header-action-buttons-container flex justify-center items-center`}>
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

  const getUpdatedServicePointInfo = async (event: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
    const servicePointId: number = Number(event.currentTarget.getAttribute('data-service-point-id') || '0');
    const servicePointData = await getServicePointDataRequest(servicePointId);
    const servicePointInformation = await getServicePointInformationRequest(servicePointId);

    dispatch(setServicePointData(servicePointData.data[0] || {}));
    dispatch(setServicePointInformation(servicePointInformation.data[0] || {}));
    dispatch(toggleModalVisibility(true));
  };

  const onColumnToggle = (event: MultiSelectChangeEvent): void => {
    const selectedColumns = event.target.value;
    const orderedSelectedColumns = servicePointTableHeadData.filter(
      (col) => selectedColumns.some((sCol) => sCol.field === col.field) || col.field === 'actions',
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  useEffect(() => {
    getServicePoints({
      body: createGetServicePointsRequestPayload(),
    });
  }, []);

  return (
    <div className={``}>
      <BaseTable
        className="w-full shadow"
        columns={visibleColumns.map((column) => {
          if (column.id === 'actions') {
            column.align = 'left';
            column.bodyTemplate = actionsButtonsContainer;
          }

          return column;
        })}
        data={prepareTableData() || []}
        exportableExcel={true}
        exportableCSV={true}
        filters={filters}
        id={`${BRAND_PREFIX}-service-points-list`}
        globalFilterFields={visibleColumns.map((column) => column.id)}
        hasFilterMatchModes={false}
        tableHeader={() => dataTableHeader()}
      />
    </div>
  );
};

export default ServicePointSection;
