import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserManagementModalPage from './UserManagementModal/UserManagementModalPage';
import Modal from '../Modal/Modal';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { getUsersRequest, searchUserRequest } from '../../../app/api/userManagements';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { IUserDataProps } from './types';

const UserManagementSection: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchedText, setSearchedText] = useState<string>('');
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
    const [userData, setUserData] = useState<IUserDataProps[]>([]);

    const getUsers = async (): Promise<void> => {
        const response = await getUsersRequest();

        setUserData(response.data);
    };
    const getSearchedUsers = async (): Promise<void> => {
        const response = await searchUserRequest(searchedText);

        setUserData(response.data);
    };

    useEffect(() => {
        if (searchedText !== '') {
            getSearchedUsers();
        } else {
            getUsers();
        }
    }, [searchedText]);

    return (
        <div className={`${BRAND_PREFIX}-user-management-table-container flex justify-between items-center flex-col`}>
            <div className={`${BRAND_PREFIX}-user-management-listing-container flex items-center w-full`}>
                <Table
                    attributeName='user-management'
                    searchedText={searchedText}
                    tableData={userData}
                    tableDataCount={userData.length}
                    tableHeadData={['Name', 'Phone', 'Role', 'Last Login', 'Actions']}
                    setSearchedText={setSearchedText}
                />
            </div>
            {
                isModalVisible && (
                    <Modal
                        className={`${BRAND_PREFIX}-user-management-modal-container`}
                        modalHeaderTitle='Kullanici Yonetimi'
                        modalId={`${BRAND_PREFIX}-user-management-modal`}
                        onClose={() => dispatch(toggleModalVisibility(false))}
                    >
                        <UserManagementModalPage />
                    </Modal>
                )
            }
        </div>
    );
};

export default UserManagementSection;
