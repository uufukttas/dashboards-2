import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserManagementModalPage from './UserManagementModal/UserManagementModalPage';
import Modal from '../Modal/Modal';
import Pagination from '../ServicePointSection/PaginationComponents/Pagination';
import Table from '../Table/Table';
import { BRAND_PREFIX } from '../../constants/constants';
import { getUsersRequest, searchUserRequest } from '../../../app/api/userManagements';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { setUsers } from '../../../app/redux/features/users';
import { AppDispatch, RootState } from '../../../app/redux/store';

const UserManagementSection: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible.isModalVisible);
    const userCount = useSelector((state: RootState) => state.users.count);
    const users = useSelector((state: RootState) => state.users.users);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchedText, setSearchedText] = useState<string>('');

    const getUsers = async (): Promise<void> => {
        const response = await getUsersRequest(currentPage);

        dispatch(setUsers({ users: response.data, count: response.count }));
    };
    const getSearchedUsers = async (): Promise<void> => {
        const response = await searchUserRequest(currentPage, searchedText);

        dispatch(setUsers({ users: response.data, count: response.count }));
    };

    useEffect(() => {
        if (searchedText !== '') {
            getSearchedUsers();
        } else {
            getUsers();
        }
    }, [currentPage, searchedText]);

    return (
        <div className={`${BRAND_PREFIX}-user-management-table-container flex justify-between items-center flex-col`}>
            <div className={`${BRAND_PREFIX}-user-management-listing-container flex items-center w-full`}>
                <Table
                    attributeName='user-management'
                    searchedText={searchedText}
                    tableData={users}
                    tableDataCount={userCount}
                    tableHeadData={['Isim/Soyisim', 'Kullanici Adi', 'Telefon', 'Rol', 'Son Giris', 'Aksiyonlar']}
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
            {
                userCount > 10 && (
                    <Pagination
                        currentPage={currentPage}
                        totalCounts={userCount}
                        setCurrentPage={setCurrentPage}
                    />
                )
            }
        </div>
    );
};

export default UserManagementSection;
