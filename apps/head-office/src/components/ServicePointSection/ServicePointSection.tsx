import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useState } from 'react';
import { FaCircleInfo, FaPen, FaTrashCan } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import {
  useDeleteServicePointMutation,
  useGetServicePointsMutation,
} from '../../../app/api/services/service-points/servicePoints.service';
import { RootState } from '../../../app/redux/store';
import { BRAND_PREFIX, CITIES, DISTRICTS } from '../../constants/constants';
import { EVENTS_EMMITER_CONSTANTS } from '../../constants/event.constants';
import useModalManager from '../../hooks/useModalManager';
import EventManager from '../../managers/Event.manager';
import { BaseTable } from '../BaseTable/BaseTable';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { servicePointTableDefaultFilters, servicePointTableHeadData } from './constants';
import './ServicePointSection.css';
import ServicePointModalForm from './ServicePointsModalComponents/ServicePointModal';
import type { IPayloadProps, IRowDataProps } from './types';

const ServicePointSection: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-service-point`;
  const router = useRouter();

  const { openModal } = useModalManager();

  const [getServicePoints, { data: servicePoints }] = useGetServicePointsMutation();
  const [deleteServicePoint] = useDeleteServicePointMutation();

  const searchProperties = useSelector((state: RootState) => state.searchedText);
  const [visibleColumns, setVisibleColumns] = useState(servicePointTableHeadData);
  const [filters, setFilters] = useState(servicePointTableDefaultFilters);

  const actionsButtonsContainer = (rowData: IRowDataProps): JSX.Element => {
    return (
      <div className={`${pagePrefix}-data-table-actions-button-container flex justify-end items-start`}>
        <a
          className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
          data-service-point-id={rowData['id']}
          onClick={() => {}}
        >
          <FaPen className="text-primary" />
        </a>
        <a
          className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
          data-service-point-id={rowData['id']}
          onClick={() => deleteServicePointInfo(rowData['id'])}
        >
          <FaTrashCan className="text-red-500" />
        </a>
        {rowData?.address && rowData?.districtId && rowData?.cityId && rowData?.phone && (
          <button
            className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
            onClick={() => {
              router.push(`/service-points/service-point/${rowData.id}`);
            }}
          >
            <FaCircleInfo className="text-primary" />
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

  const handleAddServicePoint = (): void => {
    openModal('add-service-point', <ServicePointModalForm />);
  };

  const dataTableHeader = (): JSX.Element => {
    const tablePrefix: string = `${pagePrefix}-data-table`;

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
              className={`${tablePrefix}-add-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
              icon="pi pi-plus text-white"
              id={`${tablePrefix}-add-button`}
              rounded
              type="button"
              onClick={handleAddServicePoint}
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

  const deleteServicePointInfo = (id: number): void => {
    openModal(
      'confirmation-modal',
      <ConfirmationModal
        name="confirmation-modal"
        onConfirm={() => {
          deleteServicePoint({ id })
            .unwrap()
            .then(() => {
              getServicePoints({
                body: createGetServicePointsRequestPayload(),
              });
            });
        }}
      />,
    );
  };

  const onColumnToggle = (event: MultiSelectChangeEvent): void => {
    const selectedColumns = event.target.value;
    const orderedSelectedColumns = servicePointTableHeadData.filter(
      // @ts-ignore
      (col) => selectedColumns.some((sCol) => sCol.field === col.field) || col.field === 'actions',
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  useEffect(() => {
    getServicePoints({
      body: createGetServicePointsRequestPayload(),
    });
  }, []);

  useEffect(() => {
    EventManager.subscribe(EVENTS_EMMITER_CONSTANTS.FIRE_REFECTCH_STATIONS, () => {
      getServicePoints({
        body: createGetServicePointsRequestPayload(),
      });
    });

    return () => {
      EventManager.removeAllListeners(EVENTS_EMMITER_CONSTANTS.FIRE_REFECTCH_STATIONS);
    };
  }, []);

  return (
    <div className={`w-full`}>
      <div className={`items-center w-full`}>
        <BaseTable
          className="w-full shadow"
          columns={visibleColumns.map((column) => {
            if (column.id === 'actions') {
              column.bodyTemplate = actionsButtonsContainer as unknown as React.ReactElement;
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
          columnResizeMode="expand"
        />
      </div>
    </div>
  );
};

export default ServicePointSection;
