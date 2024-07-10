import React, { useState } from 'react';
import { FaEquals, FaGreaterThan, FaLessThan } from "react-icons/fa6";
import { TbTilde } from "react-icons/tb";
import { Button } from '@projects/button';
import { Tooltip } from '@projects/tooltip';
import FilterInput from './FilterInput';
import Accordion from '../Accordion/Accordion';
import Tabs from '../Tabs/Tabs';
import { BRAND_PREFIX } from '../../constants/constants';
import { IFilterProps } from './types';
import './Filter.css';

const DynamicFilters = ({ className, filters, setFilters, onFilterSubmit, isExpanded, setIsExpanded }: IFilterProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const stringFilter = [
    {
      title: (
        <Tooltip text="Eşittir">
          <FaEquals />
        </Tooltip>
      ),
    }, {
      title: (
        <Tooltip text="Icinde">
          <TbTilde />
        </Tooltip>
      ),
    }
  ];
  const decimalFilter = [
    {
      title: (
        <Tooltip text="Eşittir">
          <FaEquals />
        </Tooltip>
      ),
    }, {
      title: (
        <Tooltip text="Buyuktur">
          <FaGreaterThan />
        </Tooltip>
      ),
    }, {
      title: (
        <Tooltip text='Kucuktur'>
          <FaLessThan />
        </Tooltip>
      ),
    }, {
      title: (
        <Tooltip text="Icinde">
          <TbTilde />
        </Tooltip>
      ),
    }
  ];
  const handleInputChange = (id: string, event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    filters.map(filter => {
      if (filter.id === id) {
        if (event.target.id.replace(/filter-input-/gi, '').split('-').length > 1) {
          filter.value2 = event.target.value;
        } else {
          filter.value = event.target.value;
        }
      }
    })

    setFilters([...filters]);
  };

  return (
    <div className={`${BRAND_PREFIX}-filter-container flex flex-col radius-md rounded-lg shadow max-h-[870px] overflow-y-scroll w-1/6 ${className} ${isExpanded ? 'expanded' : ''}`}>
      <div className={`${BRAND_PREFIX}-filter-header flex justify-between items-center h-1/12`}>
        <h3 className='text-lg font-bold'>Filtreler</h3>
      </div>
      <div className={`${BRAND_PREFIX}-filter-accordions-container flex justify-between items-center h-11/12 flex-col overflow-y-scroll`}>
        {
          filters.map((filter, index) => (
            <Accordion
              accordionClassName={`${BRAND_PREFIX}-filter-accordion flex flex-col w-full my-2 font-bold`}
              accordionTitle={filter.label}
              contentClassName={`${BRAND_PREFIX}-filter-content flex flex-col w-full`}
              isAccordionOpen={false}
              key={filter.id}>
              <Tabs
                activeTabIndex={activeTabIndex}
                setActiveTabIndex={setActiveTabIndex}
                filters={filters}
                tabItems={filter.type !== 'number' ? stringFilter : decimalFilter}
              />
              <div className={`${BRAND_PREFIX}-filter-item flex flex-col my-2`}>
                <label className='w-full flex items-center justify-start font-normal' htmlFor={filter.id}>{filter.label}</label>
                <FilterInput className="w-full" filter={filter} value={filters[index].id} onChange={(id, event) => handleInputChange(event, id)} />
                {
                  !(filter.isHidden) && filter.operatorId === 3 && (
                    <FilterInput className="w-full" filter={filter} value={filters[index].id} id={'2'} onChange={(id, event) => handleInputChange(event, id)} />
                  )
                }
              </div>
            </Accordion>
          ))
        }
      </div>
      <div className='filter-submit-button flex justify-end w-full my-2 h-1/12 sticky'>
        <Button
          buttonText='Filtrele'
          className='bg-primary text-text text-sm rounded-lg block p-2.5'
          id='filter-button'
          type='submit'
          onClick={() => onFilterSubmit()}
        />
      </div>
    </div>
  );
}

export default DynamicFilters;
