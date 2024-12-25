import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { FaCircleInfo, FaPen, FaTrashCan } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { servicePointTableDefaultFilters, servicePointTableHeadData } from './constants';
import ServicePointModalForm from './ServicePointsModalComponents/ServicePointModal';
import { BaseTable } from '../BaseTable/BaseTable';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../constants/constants';
import { EVENTS_EMMITER_CONSTANTS } from '../../constants/event.constants';
import useModalManager from '../../hooks/useModalManager';
import EventManager from '../../managers/Event.manager';
import {
  useDeleteServicePointMutation,
  useGetServicePointsMutation,
} from '../../../app/api/services/service-points/servicePoints.service';
import { RootState } from '../../../app/redux/store';
import type { IBaseTableColumn, IPayloadProps, IRowDataProps, IServicePointData } from './types';
import './ServicePointSection.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

const ServicePointSection: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-service-points`;
  const [deleteServicePoint] = useDeleteServicePointMutation();
  const [getServicePoints, { data: servicePoints }] = useGetServicePointsMutation();
  const { openModal } = useModalManager();
  const router = useRouter();
  const searchProperties = useSelector((state: RootState) => state.searchedText);
  const [visibleColumns, setVisibleColumns] = useState(servicePointTableHeadData);

  const createActionsButtonsContainer = (rowData: IRowDataProps): JSX.Element => {
    return (
      <div className={`${pagePrefix}-table-actions-buttons-container flex items-start`}>
        <div className={`${pagePrefix}-table-actions-update-button-container flex justify-end items-start w-1/3`}>
          <Button
            className={`${pagePrefix}-table-actions-update-button font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out`}
            data-service-point-id={rowData['id']}
            onClick={() => handleUpdateServicePoint(rowData['id'])}
          >
            <FaPen className="text-primary" fontSize={24}/>
          </Button>
        </div>
        <div className={`${pagePrefix}-table-actions-delete-button-container flex justify-end items-start w-1/3`}>
          <Button
            className={`${pagePrefix}-table-actions-delete-button font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out`}
            data-service-point-id={rowData['id']}
            onClick={() => deleteServicePointInfo(rowData['id'])}
          >
            <FaTrashCan className="text-red-500" fontSize={24}/>
          </Button>
        </div>
        {rowData?.address && rowData?.districtId && rowData?.cityId && rowData?.phone && (
          <div className={`${pagePrefix}-table-actions-info-button-container flex justify-end items-start w-1/3`}>
            <Button
              className={`${pagePrefix}-table-actions-info-button font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out`}
              onClick={() => { router.push(`/service-points/service-point/${rowData.id}`); }}
            >
              <FaCircleInfo className="text-primary" fontSize={24}/>
            </Button>
          </div>
        )}
      </div>
    );
  };
  const createGetServicePointsRequestPayload = (): IPayloadProps => {
    const payload: IPayloadProps = {};

    /*
      This is for the search functionality on the prime react table. This functionality is working on the frontend.
      We fetch all the data from the backend and then we filter the data on the frontend with the prime react table's search properties.
    */
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
    const tablePrefix: string = `${pagePrefix}-table`;

    return (
      <div className={`${tablePrefix}-header-container flex justify-between items-center`}>
        <div className={`${tablePrefix}-header-filter-container flex justify-start items-center`}>
          <div className={`${tablePrefix}-header-select-container mx-4`}>
            <MultiSelect
              className={`${tablePrefix}-header-column-name-selection w-full sm:w-20rem text-white`}
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
              className={`${tablePrefix}-add-button flex justify-center items-center bg-primary text-white rounded text-base font-semibold hover:bg-primary-lighter p-3`}
              id={`${tablePrefix}-add-button`}
              label="İstasyon Ekle"
              rounded
              type="button"
              onClick={handleAddServicePoint}
            />
          </div>
        </div>
      </div>
    );
  };
  const deleteServicePointInfo = (stationId: number): void => {
    openModal(
      'deleteServicePointConfirmationModal',
      <ConfirmationModal
        name="deleteServicePointConfirmationModal"
        onConfirm={() => {
          deleteServicePoint({ id: stationId })
            .unwrap()
            .then(() => { getServicePoints({ body: createGetServicePointsRequestPayload() }); });
        }}
      />,
    );
  };
  const handleAddServicePoint = (): void => {
    openModal('addServicePointModal', <ServicePointModalForm modalName="addServicePointModal" />);
  };
  const handleUpdateServicePoint = (stationId: number): void => {
    openModal(
      'updateServicePointModal',
      <ServicePointModalForm modalName="updateServicePointModal" stationId={stationId}
      />
    );
  };
  const prepareTableData = (): IServicePointData[] | [] => {
    if (!servicePoints) {
      return [];
    }

    const newTableData = servicePoints.map((data) => {
      return {
        ...data,
        city: CITIES[data.cityId?.toString() as keyof typeof CITIES],
        district: DISTRICTS[(data.districtId?.toString() as keyof typeof DISTRICTS) || '0'],
      };
    });

    return newTableData;
  };
  const onColumnToggle = (event: MultiSelectChangeEvent): void => {
    const selectedColumns = event.target.value;
    const orderedSelectedColumns = servicePointTableHeadData
      .filter((col) => selectedColumns
        .some((sCol: IBaseTableColumn) => sCol.field === col.field) || col.field === 'actions',
      );

    setVisibleColumns(orderedSelectedColumns);
  };

  useEffect(() => {
    getServicePoints({ body: createGetServicePointsRequestPayload() });

    EventManager.subscribe(EVENTS_EMMITER_CONSTANTS.FIRE_REFECTCH_STATIONS, () => {
      getServicePoints({ body: createGetServicePointsRequestPayload() });
    });

    return () => {
      EventManager.removeAllListeners(EVENTS_EMMITER_CONSTANTS.FIRE_REFECTCH_STATIONS);
    };
  }, []);

  return (
    <div className={`${pagePrefix}-wrapper w-full`}>
      <div className={`${pagePrefix}-table-container items-center w-full`}>
        <BaseTable
          className={`${pagePrefix}-table w-full shadow`}
          columnResizeMode="expand"
          columns={visibleColumns.map((column) => {
            if (column.id === 'actions') {
              column.bodyTemplate = createActionsButtonsContainer;
            }

            return column;
          })}
          data={prepareTableData() || []}
          exportableExcel={true}
          exportableCSV={true}
          filters={servicePointTableDefaultFilters}
          id={`${BRAND_PREFIX}-service-points`}
          globalFilterFields={visibleColumns.map((column) => column.id)}
          hasFilterMatchModes={false}
          tableHeader={() => dataTableHeader()}
        />
      </div>
    </div>
  );
};

export default ServicePointSection;
