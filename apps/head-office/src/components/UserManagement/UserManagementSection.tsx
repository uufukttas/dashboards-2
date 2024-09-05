import React, { useEffect, useState } from 'react';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { Dialog } from '@projects/dialog';
import {
    initialUserManagementDataValues,
    userManagementTableHeadData
} from './constants';
import UserManagementModalPage from './UserManagementModal/UserManagementModalPage';
import Modal from '../Modal/Modal';
import { BRAND_PREFIX } from '../../constants/constants';
import { deleteUserRequest, getUserRequest, getUsersRequest } from '../../../app/api/userManagements';
import { hideAlert, showAlert } from '../../../app/redux/features/alertInformation';
import { hideDialog, showDialog } from '../../../app/redux/features/dialogInformation';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { toggleUserListUpdate } from '../../../app/redux/features/isUserListUpdated';
import { setSearchProperties } from '../../../app/redux/features/searchProperties';
import { setUsers } from '../../../app/redux/features/users';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { setUserData } from '../../../app/redux/features/userData';
import type { IPayloadProps } from './types';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { IUserDataProps } from './types';
import './UserManagementSection.css';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

const UserManagementSection: React.FC = () => {
    const userManagementPrefix: string = `${BRAND_PREFIX}-user-management`;
    const dispatch = useDispatch<AppDispatch>();
    const alertInformation = useSelector((state: RootState) => state.alertInformation);
    const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
    const isUserListUpdated = useSelector((state: RootState) => state.isUserListUpdated.isUserListUpdated);
    const searchProperties = useSelector((state: RootState) => state.searchedText);
    const { users } = useSelector((state: RootState) => state.users);
    const [visibleColumns, setVisibleColumns] = useState(userManagementTableHeadData);

    const defaultFilters: DataTableFilterMeta = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        userName: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        phoneNumber: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        },
        roles: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        }
    };
    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');


    const createGetUsersRequestPayload = (): IPayloadProps => {
        const payload: IPayloadProps = {
        };

        searchProperties.searchedConditions.map((condition: string) => {
            switch (condition) {
                case 'Isim/Soyisim':
                    payload['name'] = searchProperties.searchedText;
                    break;
                case 'Kullanici Adi':
                    payload['userName'] = searchProperties.searchedText;
                    break;
                case 'Telefon':
                    payload['phoneNumber'] = searchProperties.searchedText;
                    break;
                case 'Rol':
                    payload['roles'] = searchProperties.searchedText;
                    break;
                default:
                    payload['name'] = searchProperties.searchedText;
                    break;
            }
        });

        payload.pageNumber = 1;
        payload.userCount = 1000;

        return payload;
    };
    const dataTableHeader = (): JSX.Element => {
        return (
            <>
                <div className={`${BRAND_PREFIX}-data-table-header-container w-full flex justify-between items-center`}>
                    <div className={`${BRAND_PREFIX}-data-table-select-container`}>
                        <MultiSelect value={visibleColumns} options={userManagementTableHeadData.filter((item) => item.isRemovable)} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />
                    </div>
                    <div className={`${BRAND_PREFIX}-data-table-action-button-container flex justify-center items-center`}>
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
                                content="Kullanici Ekle"
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
    const deleteUser = async (deletedId: number): Promise<void> => {
        const response = await deleteUserRequest(deletedId);
        let type: string = 'success';

        response.message = response.message || 'Kullanici basariyla silindi';

        if (!response.success) {
            type = 'error';
            response.message = 'Kullanici silinirken bir hata olustu';
        };

        dispatch(
            showAlert({ message: response.message, type: type })
        );

        setTimeout(() => {
            dispatch(hideAlert());
        }, 5000);
    };
    const getUpdatedUserInfo = async (event: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
        const userId = Number(event.currentTarget.getAttribute('data-user-management-id') || '0');
        const userData = await getUserRequest(userId);

        dispatch(setUserData(userData));
        dispatch(toggleModalVisibility(true));
    };
    const getUsers = async (): Promise<void> => {
        const response = await getUsersRequest(createGetUsersRequestPayload());

        dispatch(setUsers({ users: response.data, count: response.count }));
        dispatch(toggleUserListUpdate(false));
    };
    const onColumnToggle = (event: MultiSelectChangeEvent): void => {
        const selectedColumns = event.target.value;
        const orderedSelectedColumns = userManagementTableHeadData
            .filter((col) => selectedColumns
                .some((sCol: { field: string; header: string; isRemovable: boolean }) => {
                    return sCol.field === col.field
                }) || col.field === 'actions');

        setVisibleColumns(orderedSelectedColumns);
    };
    const prepareTableData = () => {
        const newTableData = users.map((data: IUserDataProps) => {

            return {
                ...data,
                name: data.name + " " + data.surName,
                roleNames: JSON.parse(data.roleNames).map((role: string) => role).join(', '),
                lastLoginDate: data.lastLoginDate ? data.lastLoginDate : 'Henüz Giriş Yapmamış'
            };
        });

        return newTableData;
    };

    const initFilters = () => {
        setFilters(defaultFilters);
        setGlobalFilterValue('');
    };

    useEffect(() => {
        dispatch(setSearchProperties({
            searchedText: searchProperties.searchedText,
            searchedConditions: []
        }));
        initFilters();
    }, []);

    useEffect(() => {
        getUsers();
    }, [searchProperties, isUserListUpdated]);

    return (
        <div className={`${userManagementPrefix}-table-container flex justify-between items-center flex-col`}>
            <div className={`${userManagementPrefix}-listing-container items-center w-full`}>
                <DataTable
                    className="w-full shadow"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    filters={filters}
                    filterDisplay="menu"
                    header={dataTableHeader}
                    // globalFilterFields={['name', 'cityId', 'districtId', 'address', 'phoneNumber']}
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
                >{
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
                                                        data-user-management-id={rowData['id']}
                                                        onClick={getUpdatedUserInfo}
                                                    >
                                                        <FaPen className='text-primary' />
                                                    </a>
                                                    <a
                                                        className="font-medium text-red-600 cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
                                                        data-user-management-id={rowData['id']}
                                                        onClick={() => {
                                                            dispatch(showDialog({
                                                                actionType: 'delete',
                                                                data: rowData['id']
                                                            }))
                                                        }}
                                                    >
                                                        <FaTrashCan />
                                                    </a>
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
                alertInformation.isVisible && (
                    <Alert
                        alertText={alertInformation.message}
                        alertType={alertInformation.type}
                        id={`${BRAND_PREFIX}-user-management-alert`}
                    />
                )
            }
            {
                isModalVisible && (
                    <Modal
                        className={`${userManagementPrefix}-modal-container`}
                        modalHeaderTitle='Kullanici Yonetimi'
                        modalId={`${userManagementPrefix}-modal`}
                        onClose={() => {
                            dispatch(toggleModalVisibility(false));
                            dispatch(setUserData(initialUserManagementDataValues));
                        }}
                    >
                        <UserManagementModalPage />
                    </Modal>
                )
            }
            {
                dialogInformation.isVisible && (
                    <Dialog
                        handleCancel={() => dispatch(hideDialog())}
                        handleSuccess={() => {
                            deleteUser(dialogInformation.data);
                            dispatch(hideDialog());
                            dispatch(toggleUserListUpdate(true));
                        }}
                    />
                )
            }
        </div>
    );
};

export default UserManagementSection;
