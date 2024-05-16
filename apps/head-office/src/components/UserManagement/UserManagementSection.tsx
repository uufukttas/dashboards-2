import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import isModalVisible, { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { AppDispatch, RootState } from '../../../app/redux/store';
import UserManagementModalPage from './UserManagementModal/UserManagementModalPage';

interface IUserDataProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    roles: string[];
    status: string;
    address?: string;
    cityId?: number;
    districtId?: number;
};

const UserManagementSection: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchedText, setSearchedText] = useState<string>('');
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);

    const userData: IUserDataProps[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '1234567890',
            roles: ['Admin', 'User', 'Guest'],
            status: 'Active',
        }, {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@doe.com',
            phone: '0987654321',
            roles: ['User', 'Employee'],
            status: 'Active',
        }
    ];

    useEffect(() => {
        dispatch(toggleLoadingVisibility(true));
    }, []);

    return (
        <div className={`${BRAND_PREFIX}-user-management-table-container flex justify-between items-center flex-col`}>
            <div className={`${BRAND_PREFIX}-user-management-listing-container flex items-center w-full`}>
                <Table
                    attributeName='user-management'
                    searchedText={searchedText}
                    tableData={userData}
                    tableDataCount={userData.length}
                    tableHeadData={['Name', 'Phone/Email', 'Role', 'Status', 'Actions']}
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
