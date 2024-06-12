import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus, FaMagnifyingGlass } from 'react-icons/fa6';
import { Button } from '@projects/button';
import { CheckboxInDropdown } from '@projects/checkbox-in-dropdown';
import { Input } from '@projects/input';
import { BRAND_PREFIX } from '../../../constants/constants';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setSearchProperties } from '../../../../app/redux/features/searchProperties';
import { RootState } from '../../../../app/redux/store';
import type { IDropdownItemProps, ITableHeaderProps } from '../types';

const TableHeader: React.FC<ITableHeaderProps> = ({ buttonText, filteredDropdownItems }: ITableHeaderProps) => {
    const tableHeaderPrefix: string = `${BRAND_PREFIX}-table-header`;
    const dispatch = useDispatch();
    const searchedText = useSelector((state: RootState) => state.searchedText.searchedText);
    const [filteredData, setFilteredData] = useState<IDropdownItemProps[]>(filteredDropdownItems);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;

        dispatch(
            setSearchProperties({
                searchedText: value,
                searchedConditions: filteredData.filter((data) => data.isChecked).map((filterName) => filterName.name)
            })
        );
    };

    const openModal = (): void => {
        dispatch(toggleModalVisibility(true));
    };

    return (
        <div className={`${tableHeaderPrefix}-actions-container flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 w-full md:flex-row border-t border-gray-300 bg-transparent`}>
            <div className={`${tableHeaderPrefix}-search-input-container flex relative w-full mx-2 md:w-1/2 lg:w-1/3`}>
                <CheckboxInDropdown
                    className={`${tableHeaderPrefix}-search-checkbox border-gray-300 text-sm text-gray-900`}
                    id={`${tableHeaderPrefix}-search-checkbox`}
                    inputName='search-checkbox'
                    items={filteredData}
                    onChange={(filterData) => { setFilteredData(filterData) }}
                />
                <div className={`${tableHeaderPrefix}-search-icon-wrapper relative flex items-center`}>
                    <div className={`${tableHeaderPrefix}-search-icon-container absolute inset-y-0 flex items-center pl-5 pointer-events-none justify-end `}>
                        <FaMagnifyingGlass />
                    </div>
                </div>
                <Input
                    className={`${tableHeaderPrefix}-search-input w-full block p-2 md:mx-2 pl-10 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary`}
                    id={`${tableHeaderPrefix}-search-input`}
                    name="search"
                    placeholder="Ara"
                    type="text"
                    value={searchedText}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <div className={`${tableHeaderPrefix}-add-button-container flex relative w-full mx-2 md:w-1/2 lg:w-1/4`}>
                <Button
                    className={`${tableHeaderPrefix}-add-button w-full bg-primary rounded-md text-base font-semibold hover:bg-primary-lighter px-2 py-2`}
                    id={`${tableHeaderPrefix}-add-button`}
                    type="button"
                    onClick={() => openModal()}
                >
                    <span className='flex justify-center items-center'>
                        <FaPlus className="mr-2" />
                        {buttonText}
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default TableHeader;
