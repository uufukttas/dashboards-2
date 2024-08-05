import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@projects/alert';
import { Button } from '@projects/button';
import { Dialog } from '@projects/dialog';
import {
    initialUserManagementDataValues,
    roleStyles,
    userManagementTableFilteredDropdownItems,
    userManagementTableHeadData
} from './constants';
import UserManagementModalPage from './UserManagementModal/UserManagementModalPage';
import Modal from '../Modal/Modal';
import Pagination from '../ServicePointSection/PaginationComponents/Pagination';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { deleteUserRequest, getUsersRequest } from '../../../app/api/userManagements';
import { hideAlert, showAlert } from '../../../app/redux/features/alertInformation';
import { hideDialog } from '../../../app/redux/features/dialogInformation';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { toggleUserListUpdate } from '../../../app/redux/features/isUserListUpdated';
import { setSearchProperties } from '../../../app/redux/features/searchProperties';
import { setUsers } from '../../../app/redux/features/users';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { setUserData } from '../../../app/redux/features/userData';
import type { IPayloadProps } from './types';

const UserManagementSection: React.FC = () => {
    const userManagementPrefix: string = `${BRAND_PREFIX}-user-management`;
    const dispatch = useDispatch<AppDispatch>();
    const alertInformation = useSelector((state: RootState) => state.alertInformation);
    const dialogInformation = useSelector((state: RootState) => state.dialogInformation);
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
    const isUserListUpdated = useSelector((state: RootState) => state.isUserListUpdated.isUserListUpdated);
    const searchProperties = useSelector((state: RootState) => state.searchedText);
    const { count, users } = useSelector((state: RootState) => state.users);
    const [currentPage, setCurrentPage] = useState<number>(1);

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

        payload.pageNumber = currentPage;
        payload.userCount = 10;

        return payload;
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
    const getUsers = async (): Promise<void> => {
        const response = await getUsersRequest(createGetUsersRequestPayload());

        dispatch(setUsers({ users: response.data, count: response.count }));
        dispatch(toggleUserListUpdate(false));
    };
    const addUserButton = (): React.ReactNode => {
        return (
            <Button
                className={`${BRAND_PREFIX}-table-header-add-button w-full bg-primary rounded-md text-base font-semibold hover:bg-primary-lighter px-2 py-2`}
                id={`${BRAND_PREFIX}-table-header-add-button`}
                type="button"
                onClick={() => toggleModalVisibility(true)}
            >
                <span className='flex justify-center items-center'>
                    {
                        <>
                            <FaPlus className="mr-2" />
                            Kullanici Ekle
                        </>
                    }
                </span>
            </Button>
        );
    };

    useEffect(() => {
        dispatch(setSearchProperties({
            searchedText: searchProperties.searchedText,
            searchedConditions: []
        }));
    }, []);

    useEffect(() => {
        getUsers();
    }, [currentPage, searchProperties, isUserListUpdated]);

    return (
        <div className={`${userManagementPrefix}-table-container flex justify-between items-center flex-col`}>
            <div className={`${userManagementPrefix}-listing-container items-center w-full`}>
                <Table
                    attributeName='user-management'
                    filteredDropdownItems={userManagementTableFilteredDropdownItems}
                    hasFilterData={true}
                    tableData={users}
                    tableDataCount={count}
                    tableHeader={addUserButton()}
                    tableHeadData={userManagementTableHeadData}
                    roleStyles={roleStyles}
                />
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
            {
                count > 10 && (
                    <Pagination
                        currentPage={currentPage}
                        totalCounts={count}
                        setCurrentPage={setCurrentPage}
                    />
                )
            }
        </div>
    );
};

export default UserManagementSection;
