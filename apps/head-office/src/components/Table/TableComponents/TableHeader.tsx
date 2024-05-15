import React from 'react';
import { useDispatch } from 'react-redux';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../constants/constants';
import { getAllServicePointsRequest } from '../../../../app/api/servicePoints';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setServicePoints } from '../../../../app/redux/features/servicePoints';
import type { ITableHeaderProps } from '../types';

const TableHeader: React.FC<ITableHeaderProps> = ({ searchedText, setSearchedText }: ITableHeaderProps) => {
    const tableHeaderPrefix = `${BRAND_PREFIX}-table-header`;
    const dispatch = useDispatch();

    const getSearchedData = async (): Promise<void> => {
        try {
            const searchedData = await getAllServicePointsRequest(1, searchedText);

            dispatch(setServicePoints(searchedData));
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className={`${BRAND_PREFIX}-table-header-actions-container flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 w-full md:flex-row border-t border-gray-300 bg-transparent`}>
            <Label className={`sr-only ${tableHeaderPrefix}-search-button-label`} htmlFor="table-search" labelText={`Search`} />
            <div className={`${tableHeaderPrefix}-search-input-container flex relative w-full mx-2 md:w-1/2 lg:w-1/4`}>
                <div className={`${tableHeaderPrefix}-search-icon-container absolute inset-y-0 flex items-center pl-5 pointer-events-none justify-end `}>
                    <FaMagnifyingGlass />
                </div>
                <Input
                    className={`${tableHeaderPrefix}-search-input w-full block p-2 md:mx-2 pl-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary`}
                    id={`${tableHeaderPrefix}-search-input`}
                    name="search"
                    placeholder="Search"
                    type="text"
                    value={searchedText}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchedText(event.target.value)}
                />
                <Button
                    buttonText="Ara"
                    className={`${tableHeaderPrefix}-search-button right-0 top-0 h-full bg-primary rounded-md font-semibold hover:bg-primary-lighter px-2 py-2`}
                    id={`${tableHeaderPrefix}-search-button`}
                    type="button"
                    onClick={getSearchedData}
                />
            </div>
            <div className={`${tableHeaderPrefix}-add-button-container w-full mx-2 md:w-1/2 lg:w-1/4 lg:mx-4`}>
                <Button
                    buttonText="+ Servis Noktasi"
                    className={`${tableHeaderPrefix}-add-button w-full bg-primary rounded-md font-semibold hover:bg-primary-lighter px-2 py-2`}
                    id={`${tableHeaderPrefix}-add-button`}
                    type="button"
                    onClick={() => dispatch(toggleModalVisibility(true))}
                />
            </div>
        </div>
    );
};

export default TableHeader;
