import React from 'react';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { IFilterInputProps } from './types';

const FilterInput = ({ className, filter, id, value, onChange }: IFilterInputProps) => {
    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event, filter.id,);
    };
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
        case 'dropdown':
            return (
                <Dropdown
                    className={`border text-text text-xs rounded-lg block focus:ring-primary focus:border-primary border-gray-200 p-2.5 ${className}`}
                    id={'station-name-filter-dropdown'}
                    items={filter.dropdownItems || []}
                    name={'station-name-filter-dropdown'}
                    value={value}
                    onChange={handleDropdownChange}
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
