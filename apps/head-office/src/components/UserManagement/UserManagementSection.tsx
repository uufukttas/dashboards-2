import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { AppDispatch, RootState } from '../../../app/redux/store';
import UserManagementModalPage from './UserManagementModal/UserManagementModalPage';
import axios from 'axios';

interface IUserDataProps {
    id: number;
    userName: string;
    email: string;
    phone: string;
    roles: string[];
    lastLoginDate: string;
    address?: string;
    cityId?: number;
    districtId?: number;
    name?: string;
};

const UserManagementSection: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchedText, setSearchedText] = useState<string>('');
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
    const [userData, setUserData] = useState<IUserDataProps[]>([]);

    const getUsers = async () => {
        await axios.get(
            'https://sharztestapi.azurewebsites.net/Auth/Users'
        ).then((response) => {
            setUserData(response.data.data);
        }).catch((error) => {
            console.log('error', error);
        });
    };

    useEffect(() => {
        dispatch(toggleLoadingVisibility(true));
        getUsers();
    }, []);

    return (
        <div className={`${BRAND_PREFIX}-user-management-table-container flex justify-between items-center flex-col`}>
            <div className={`${BRAND_PREFIX}-user-management-listing-container flex items-center w-full`}>
                <Table
                    attributeName='user-management'
                    searchedText={searchedText}
                    tableData={userData}
                    tableDataCount={userData.length}
                    tableHeadData={['Name', 'Phone/Email', 'Role', 'Last Login', 'Actions']}
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
