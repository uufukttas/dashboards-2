import React, { useState } from 'react';
import { CheckboxInDropdown } from '@projects/checkbox-in-dropdown';
import { Input } from '@projects/input';
import { IFilterInputProps } from './types';

const FilterInput = ({ className, filter, id, value, setFilters, onChange }: IFilterInputProps) => {
    const [filteredData, setFilteredData] = useState(filter.dropdownItems || []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event, filter.id);
    };

    switch (filter.type) {
        case 'text':
        case 'number':
            return (
                <Input
                    className={`block p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary ${className}`}
                    id={`filter-input-${filter.id}${id ? (`-${id}`) : ''}`}
                    name={`filter-input-${filter.id}${id ? id : ''}`}
                    type="text"
                    onChange={handleInputChange}
                />
            );
        case 'checkboxInDropdown':
            return (
                <CheckboxInDropdown
                    className={`border text-text text-xs rounded-lg block focus:ring-primary focus:border-primary border-gray-200 p-2.5 ${className}`}
                    id={'station-name-filter-dropdown'}
                    items={filteredData}
                    inputName={'station-name-filter-dropdown'}
                    onChange={(filterData) => {
                        const updateFilteredData = filterData.map((data) => ({
                            id: null,
                            name: data.name,
                            isChecked: data.isChecked,
                            rid: data.rid || 0,
                            stationFeatureType: data.stationFeatureType,
                            stationFeatureValue: data.stationFeatureValue,
                        }));
                        setFilteredData(updateFilteredData);
                        setFilters((prevFilter) => {
                            return prevFilter.map((item) => {
                                if (item.id === filter.id) {
                                    return {
                                        ...item,
                                        dropdownItems: filteredData,
                                    };
                                }
                                return item;
                            });
                        })
                    }}
                />
            );
        case 'date':
            return (
                <Input
                    className={`block p-2 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary ${className}`}
                    id={'station-name-filter-date'}
                    name={'station-name-filter-date'}
                    type="date"
                    onChange={handleInputChange}
                />
            );
        default:
            return null;
    }
}

export default FilterInput;
