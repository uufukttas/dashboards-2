import React, { useEffect, useState } from 'react';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/redux/store';
import { BRAND_PREFIX } from '../../constants/constants';
import Table from '../Table/Table';

interface IUserDataProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string[];
    status: string;
    address?: string;
    cityId?: number;
    districtId?: number;
};

const UserManagementSection: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchedText, setSearchedText] = useState<string>('');

    const userData: IUserDataProps[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '1234567890',
            role: ['Admin', 'User', 'Guest'],
            status: 'Active',
        }, {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@doe.com',
            phone: '0987654321',
            role: ['User', 'Employee'],
            status: 'Active',
        }
    ];

    useEffect(() => {
        dispatch(toggleLoadingVisibility(true));
    }, []);

    return (
        <div className={`${BRAND_PREFIX}-service-points-container flex justify-between items-center flex-col`}>
            <div className={`${BRAND_PREFIX}-service-point-listing-container flex items-center w-full`}>
                <Table
                    searchedText={searchedText}
                    tableData={userData}
                    tableDataCount= {userData.length}
                    tableHeadData={['Name', 'Phone/Email', 'Role', 'Status', 'Actions']}
                    setSearchedText={setSearchedText}
                />
            </div>
        </div>
    );
};

export default UserManagementSection;
