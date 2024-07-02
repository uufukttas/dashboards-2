import React, { useState } from 'react';
import { Button } from '@projects/button';
import FilterInput from './FilterInput';
import { BRAND_PREFIX } from '../../constants/constants';
import { IFilterProps } from './types';
import './Filter.css';

const DynamicFilters = ({ className, filters }: IFilterProps) => {
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>(
    filters.reduce((acc, filter) => ({ ...acc, [filter.id]: filter.defaultValue }), {})
  );

  const handleInputChange = (id: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className={`${BRAND_PREFIX}-filter-container flex flex-col border border-gray-200 p-4 radius-md rounded-lg shadow sm:p-5 max-h-[870px] overflow-y-scroll ${className}`}>
      {
        filters.map(filter => (
          <div key={filter.id} className='filter-item flex my-2'>
            <label className='w-1/2 flex items-center justify-start' htmlFor={filter.id}>{filter.label}</label>
            <FilterInput className="w-1/2" filter={filter} value={filterValues[filter.id]} onChange={handleInputChange} />
          </div>
        ))
      }
      <div className='filter-submit-button flex justify-end w-full my-2'>
        <Button
          buttonText='Filtrele'
          className='bg-primary text-text text-sm rounded-lg block p-2.5'
          id='filter-button'
          type='submit'
          onClick={() => console.log(filterValues)}
        />
      </div>
    </div>
  );
}

export default DynamicFilters;
