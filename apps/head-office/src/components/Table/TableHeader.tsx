import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleModalVisibility } from '../../../app/redux/features/isModalVisible';
import { RootState } from '../../../app/redux/store';

const TableActions = () => {
    const dispatch = useDispatch();
    const isModalVisible = useSelector((state: RootState) => state.isModalVisible);

    const handleClick = () => {
        dispatch(toggleModalVisibility(isModalVisible))
    };

    return (
        <div className={`${BRAND_PREFIX}-table-actions-container flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 w-full md:flex-row border-t border-gray-300 bg-transparent`}>
            <Label className="sr-only" htmlFor="table-search" labelText={`Search`} />
            <div className={`${BRAND_PREFIX}-service-point-search-input-container relative w-4/5 md:w-1/6 mx-2`}>
                <div className={`${BRAND_PREFIX}-service-point-search-icon-container absolute inset-y-0 flex items-center pl-5 pointer-events-none justify-end `}> 
                    <FaMagnifyingGlass  />
                </div>
                <Input
                    className={`${BRAND_PREFIX}-service-point-search-input w-full block p-2 md:mx-2 pl-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500`}
                    id="table-search-input"
                    name="search"
                    placeholder="Search users"
                    type="text"
                />
            </div>
            <div className={`${BRAND_PREFIX}-table-actions w-4/5 md:w-1/6 mx-4`}>
                <Button
                    className={`${BRAND_PREFIX}-add-service-point-button w-full bg-primary rounded-md font-semibold hover:bg-primary-lighter`}
                    type="button"
                    onClick={handleClick}
                >
                    + Lokasyon
                </Button>
            </div>
        </div>
    );
};

export default TableActions;
