import React, { useState } from 'react';
import { Button } from '@projects/button';
import Accordion from '../Accordion/Accordion';
import FilterInput from './FilterInput';
import Tabs from '../Tabs/Tabs';
import { BRAND_PREFIX } from '../../constants/constants';
import { IFilterProps } from './types';
import './Filter.css';

const Filters: React.FC<IFilterProps> = ({
  className, filters, isExpanded, onFilterSubmit, setFilters
}: IFilterProps) => {
  const filterPrefix: string = `${BRAND_PREFIX}-filter`;
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleInputChange = (id: string, event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    filters.map(filter => {
      if (filter.id === id) {
        if (event.target.id.replace(/filter-input-/gi, '').split('-').length > 1) {
          filter.value2 = event.target.value;
        } else {
          filter.value = event.target.value;
        }

        filter.operatorId = activeTabIndex.toString();
      }
    })

    setFilters([...filters]);
  };

  return (
    <div className={`${filterPrefix}-container flex flex-col radius-md rounded-lg shadow max-h-[910px] overflow-y-scroll w-1/6 ${className} ${isExpanded ? 'expanded' : ''}`}>
      <div className={`${filterPrefix}-header-container flex justify-between items-center h-1/12`}>
        <h3 className={`${filterPrefix}-header text-lg font-bold`}>Filtreler</h3>
      </div>
      <div className={`${filterPrefix}-accordions-container flex justify-between items-center h-11/12 flex-col overflow-y-scroll`}>
        {
          filters.map((filter, index) => (
            <Accordion
              accordionClassName={`${filterPrefix}-accordion-container flex flex-col w-full my-2 font-bold`}
              accordionTitle={filter.label}
              contentClassName={`${filterPrefix}-accordion-content flex flex-col w-full md:px-4`}
              isAccordionOpen={false}
              key={filter.id}>
              <>
                {
                  filter.operators.length > 0 && (
                    <Tabs
                      activeTabIndex={activeTabIndex}
                      setActiveTabIndex={setActiveTabIndex}
                      tabItems={filter.operators}
                    />
                  )
                }
                {/* {
                  (filter.id === 'StartDate' || filter.id === 'FinishDate') && (
                    <div className='flex'>
                      <Label
                        className='w-full flex items-center justify-start font-normal'
                        htmlFor=''
                        labelText='Iki Tarih Arasi'
                      />
                      <Toggle
                        onToggle={(event) => {
                          // @ts-ignore
                          setFilters((prevFilter) => {
                            return prevFilter.map((item: IFilterItemProps) => {
                              if (item.id === filter.id) {
                                return {
                                  ...item,
                                  isHidden: !item.isHidden,
                                };
                              }

                              return item;
                            });
                          });
                        }}
                      />
                    </div>
                  )
                } */}
                <div className={`${filterPrefix}-item flex flex-col my-2`}>
                  <FilterInput className="w-full" filter={filter} value={filters[index].id} setFilters={setFilters} onChange={(id, event) => handleInputChange(event, id)} />
                  {
                    filter.isDoubleValue && (
                      <FilterInput className={`${!filters[index].isHidden ? 'hidden' : ''}`} filter={filter} setFilters={setFilters} value={filters[index].id} id={'2'} onChange={(id, event) => handleInputChange(event, id)} />
                    )
                  }
                </div>
              </>
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

export default Filters;
