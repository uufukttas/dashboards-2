import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Tooltip } from 'primereact/tooltip';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import {
  useDeleteUserMutation,
  useGetUserMutation,
  useGetUsersMutation,
} from '../../../app/api/services/user/user.service';
import { setSearchProperties } from '../../../app/redux/features/searchProperties';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import { userManagementTableHeadData } from './constants';
import { IUserDataProps } from './types';
import UserManagementModalPage from './UserManagementModal/UserManagementModalPage';
import './UserManagementSection.css';

const UserManagementSection: React.FC = () => {
  const userManagementPrefix: string = `${BRAND_PREFIX}-user-management`;
  const dispatch = useDispatch<AppDispatch>();
  const searchProperties = useSelector((state: RootState) => state.searchedText);
  const [visibleColumns, setVisibleColumns] = useState(userManagementTableHeadData);

  const defaultFilters: DataTableFilterMeta = useMemo(
    () => ({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      userName: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      phoneNumber: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      roles: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    }),
    [],
  );

  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  const [getUsers, { data: users }] = useGetUsersMutation();
  const [getUser] = useGetUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const { openModal } = useModalManager();

  const _getUsers = useCallback(() => {
    getUsers({
      body: {
        page: 1,
        pageSize: 1000,
        name: searchProperties.searchedText,
        userName: searchProperties.searchedText,
        phoneNumber: searchProperties.searchedText,
        roles: searchProperties.searchedText,
      },
    });
  }, [searchProperties.searchedText, getUsers]);

  const handleOpenUserManagementModal = () => {
    openModal('userManagement', <UserManagementModalPage onSuccess={_getUsers} />);
  };

  const dataTableHeader = (): JSX.Element => {
    return (
      <>
        <div className={`${BRAND_PREFIX}-data-table-header-container w-full flex justify-between items-center`}>
          <div className={`${BRAND_PREFIX}-data-table-select-container`}>
            <MultiSelect
              value={visibleColumns}
              options={userManagementTableHeadData.filter((item) => item.isRemovable)}
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
                onClick={handleOpenUserManagementModal}
              />
              <Tooltip
                className={`${BRAND_PREFIX}-data-table-add-button-tooltip text-base`}
                content="Kullanıcı Ekle"
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

  const onColumnToggle = (event: MultiSelectChangeEvent): void => {
    const selectedColumns = event.target.value;
    const orderedSelectedColumns = userManagementTableHeadData.filter(
      (col) =>
        selectedColumns.some((sCol: { field: string; header: string; isRemovable: boolean }) => {
          return sCol.field === col.field;
        }) || col.field === 'actions',
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const prepareTableData = () => {
    const newTableData = users?.map((data: IUserDataProps) => {
      return {
        ...data,
        name: data.name + ' ' + data.surName,
        roleNames: JSON.parse(data.roleNames)
          .map((role: string) => role)
          .join(', '),
        lastLoginDate: data.lastLoginDate ? data.lastLoginDate : 'Henüz Giriş Yapmamış',
      };
    });

    return newTableData;
  };

  const initFilters = useCallback(() => {
    setFilters(defaultFilters);
    setGlobalFilterValue('');
  }, [defaultFilters]);

  useEffect(() => {
    dispatch(
      setSearchProperties({
        searchedText: searchProperties.searchedText,
        searchedConditions: [],
      }),
    );

    initFilters();
  }, [dispatch, initFilters, searchProperties.searchedText]);

  useEffect(() => {
    _getUsers();
  }, [searchProperties, getUsers, _getUsers]);

  return (
    <div className={`${userManagementPrefix}-table-container flex justify-between items-center flex-col`}>
      <div className={`${userManagementPrefix}-listing-container items-center w-full`}>
        <DataTable
          className="w-full shadow"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          filters={filters}
          filterDisplay="menu"
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
          {visibleColumns.map((headerProps, index) => {
            if (headerProps.field !== 'actions') {
              return (
                <Column
                  className="border-none"
                  field={headerProps.field}
                  filter
                  filterMenuClassName="border-none shadow-lg"
                  filterPlaceholder={`${headerProps.header}...`}
                  header={headerProps.header}
                  headerClassName="border-0"
                  key={index}
                  sortable={true}
                />
              );
            } else {
              return (
                <Column
                  body={(rowData) => {
                    return (
                      <div
                        className={`${BRAND_PREFIX}-data-table-actions-button-container flex justify-start items-center`}
                      >
                        <a
                          className="font-medium text-blue-600 cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
                          data-user-management-id={rowData['id']}
                          onClick={() => {
                            getUser({
                              body: {
                                userId: rowData['id'],
                              },
                            });
                          }}
                        >
                          <FaPen className="text-primary" />
                        </a>
                        <a
                          className="font-medium text-red-600 cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
                          data-user-management-id={rowData['id']}
                          onClick={() => {
                            deleteUser({
                              body: {
                                userId: rowData['id'],
                              },
                            });
                          }}
                        >
                          <FaTrashCan />
                        </a>
                      </div>
                    );
                  }}
                  field={headerProps.field}
                  frozen
                  header={headerProps.header}
                  headerClassName={`flex justify-start items-center`}
                  key={index}
                />
              );
            }
          })}
        </DataTable>
      </div>
    </div>
  );
};

export default UserManagementSection;
