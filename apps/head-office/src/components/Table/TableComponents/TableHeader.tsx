import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../constants/constants';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import type { IDropdownItemProps, ITableHeaderProps } from '../types';
import { CheckboxInDropdown } from '@projects/checkbox-in-dropdown';

const TableHeader: React.FC<ITableHeaderProps> = ({ attributeName, searchedText, setSearchedText }: ITableHeaderProps) => {
    const tableHeaderPrefix: string = `${BRAND_PREFIX}-table-header`;
    const dispatch = useDispatch();

    const openModal = (): void => {
        dispatch(toggleModalVisibility(true));
    };

    const [filteredData, setFilteredData] = useState<IDropdownItemProps[]>([{
        id: 1,
        isChecked: false,
        name: 'Telefon',
        rid: null,
        stationFeatureType: 0,
        stationFeatureValue: 0,
    }, {
        id: 2,
        isChecked: false,
        name: 'Adres',
        rid: null,
        stationFeatureType: 0,
        stationFeatureValue: 0,
    }, {
        id: 3,
        isChecked: false,
        name: 'Il',
        rid: null,
        stationFeatureType: 0,
        stationFeatureValue: 0,
    }, {
        id: 4,
        isChecked: false,
        name: 'Ilce',
        rid: null,
        stationFeatureType: 0,
        stationFeatureValue: 0,
    }]);

    return (
        <div className={`${tableHeaderPrefix}-actions-container flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 w-full md:flex-row border-t border-gray-300 bg-transparent`}>
            <Label
                className={`sr-only ${tableHeaderPrefix}-search-button-label`}
                htmlFor="table-search"
                labelText={`Search`}
            />
            <div className={`${tableHeaderPrefix}-search-input-container flex relative w-full mx-2 md:w-1/2 lg:w-1/3`}>
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
                <CheckboxInDropdown
                    className={`${tableHeaderPrefix}-search-checkbox border-gray-300 text-sm text-gray-900`}
                    id={`${tableHeaderPrefix}-search-checkbox`}
                    inputName='search-checkbox'
                    items={filteredData}
                    onChange={(filterData) => {
                        setFilteredData(filterData);
                    }}
                />
            </div>
            <div className={`${tableHeaderPrefix}-add-button-container w-full mx-2 md:w-1/2 lg:w-1/4 lg:mx-4`}>
                <Button
                    buttonText={attributeName === 'user-management' ? "+ Kullanici" : "+ Istasyon"}
                    className={`${tableHeaderPrefix}-add-button w-full bg-primary rounded-md font-semibold hover:bg-primary-lighter px-2 py-2`}
                    id={`${tableHeaderPrefix}-add-button`}
                    type="button"
                    onClick={() => openModal()}
                />
            </div>
        </div>
    );
};

export default TableHeader;
