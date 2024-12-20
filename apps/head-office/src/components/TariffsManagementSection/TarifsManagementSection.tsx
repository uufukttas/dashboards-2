import { Tariff } from 'apps/head-office/app/api/services/tarrifs/tarrif.interface';
import {
  useDeleteTariffMutation,
  useGetTariffsMutation,
} from 'apps/head-office/app/api/services/tarrifs/tarrif.service';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { DataTableFilterMeta } from 'primereact/datatable';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/redux/store';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import { BaseTable } from '../BaseTable/BaseTable';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { tariffsTableHeadData } from './constants';
import TariffsModalComponent from './TariffsManagementModalComponents/TariffsModalComponent';
import './TariffsManagementSection.css';

const TarifssManagementSection: React.FC = () => {
  const tarifssManagementSectionPrefix: string = `${BRAND_PREFIX}-tariffs-management`;
  const searchProperties = useSelector((state: RootState) => state.searchedText);
  const [visibleColumns, setVisibleColumns] = useState(tariffsTableHeadData);

  const [getAllTariffsRequest, { data: tarrifs }] = useGetTariffsMutation();
  const [deleteTariffRequest] = useDeleteTariffMutation();

  const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    saleUnitPrice: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    validityBeginDate: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    validityEndDate: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    kwRange: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    createDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
  };
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  const { openModal } = useModalManager();

  const handleAddTariff = () => {
    openModal('addTariff', <TariffsModalComponent onAddTariff={() => getAllTariffs(searchProperties.searchedText)} />);
  };

  const handleDeleteTariff = (tariffId: number) => {
    openModal(
      'confirmation',
      <ConfirmationModal
        name="confirmation"
        onConfirm={() =>
          deleteTariffRequest({ body: { tariffId } })
            .unwrap()
            .then(() => getAllTariffs(searchProperties.searchedText))
        }
      />,
    );
  };

  const dataTableHeader = (): JSX.Element => {
    return (
      <>
        <div className={`${BRAND_PREFIX}-data-table-header-container w-full flex justify-between items-center`}>
          <div className={`${BRAND_PREFIX}-data-table-select-container`}>
            <MultiSelect
              value={visibleColumns}
              options={tariffsTableHeadData.filter((item) => item.isRemovable)}
              optionLabel="header"
              onChange={onColumnToggle}
              className="w-full sm:w-20rem"
              display="chip"
            />
          </div>
          <div className={`${BRAND_PREFIX}-data-table-action-button-container flex justify-center items-center`}>
            <div className={`${BRAND_PREFIX}-data-table-add-button-container mx-4`}>
              <Button
                className={`${BRAND_PREFIX}-table-header-add-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
                icon="pi pi-plus"
                id={`${BRAND_PREFIX}-table-header-add-button`}
                rounded
                type="button"
                onClick={handleAddTariff}
              />
              <Tooltip
                className={`${BRAND_PREFIX}-data-table-add-button-tooltip text-base`}
                content="Tarife Ekle"
                position="bottom"
                target={`#${BRAND_PREFIX}-table-header-add-button`}
                style={{ fontSize: '12px', padding: '4px' }}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const getAllTariffs = (tariffName: string) => {
    getAllTariffsRequest({
      body: {
        name: tariffName,
        pageNumber: 1,
      },
    }).unwrap();
  };

  const onColumnToggle = (event: MultiSelectChangeEvent): void => {
    const selectedColumns = event.target.value;
    const orderedSelectedColumns = tariffsTableHeadData.filter(
      (col) =>
        selectedColumns.some((sCol: { field: string; header: string; isRemovable: boolean }) => {
          return sCol.field === col.field;
        }) || col.field === 'actions',
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const prepareTableData = () => {
    const data = tarrifs?.map((tariff: Tariff) => {
      return {
        ...tariff,
        createDate: new Date(tariff.createDate).toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        kwRange: `${tariff.minKW} - ${tariff.maxKW}`,
        validityBeginDate: new Date(tariff.validityBeginDate).toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        validityEndDate: new Date(tariff.validityEndDate).toLocaleDateString('tr-TR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
    });

    return data;
  };

  const createActionsButtonsContainer = (rowData: Tariff): JSX.Element => {
    return (
      <div className={`${tarifssManagementSectionPrefix}-table-actions-button-container flex justify-start items-center`}>
        <div className={`${tarifssManagementSectionPrefix}-table-actions-delete-button-container flex justify-end items-start w-1/3`}>
          <Button
            className={`${tarifssManagementSectionPrefix}-table-actions-delete-button font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out`}
            data-user-management-id={rowData['id']}
            onClick={() => handleDeleteTariff(rowData['id'])}
          >
            <FaTrashCan />
          </Button>
        </div>
      </div>
    );
  };

  const initFilters = () => {
    setFilters(defaultFilters);
  };

  useEffect(() => {
    getAllTariffs(searchProperties.searchedText);
    initFilters();
  }, [searchProperties]);

  return (
    <div className={`${BRAND_PREFIX}-tariffs-management-container flex justify-between items-center flex-col`}>
      <div className={`${tarifssManagementSectionPrefix}-listing-container items-center w-full`}>
        <BaseTable
          columns={visibleColumns.map((column) => {
            if (column.id === 'actions') {
              // @ts-ignore
              column.bodyTemplate = createActionsButtonsContainer;
            }

            return column;
          })}
          data={prepareTableData() || []}
          globalFilterFields={['name', 'saleUnitPrice', 'kwRange']}
          filters={filters}
          id={`${tarifssManagementSectionPrefix}-list`}
          tableHeader={dataTableHeader}
        />
      </div>
    </div>
  );
};

export default TarifssManagementSection;
