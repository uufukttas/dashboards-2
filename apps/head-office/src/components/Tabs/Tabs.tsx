import React, { useState } from 'react';
import { Button } from '@projects/button';
import { BRAND_PREFIX } from '../../constants/constants';
import type { ITabsItemProps, ITabsProps } from './types';
import './Tabs.css';

const Tabs: React.FC<ITabsProps> = ({ activeTabIndex, setActiveTabIndex, tabItems, filters, setFilters }: ITabsProps) => {
  const tabPrefix: string = `${BRAND_PREFIX}-tabs`;
  const [activeIndexId, setActiveIndexId] = useState<number>(activeTabIndex);

  setActiveTabIndex(activeIndexId);

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setActiveIndexId(index);

    if (Object.values(event?.currentTarget?.parentElement?.parentElement?.children[1]?.children[2]?.classList || []).indexOf('hidden') > -1 && index === 3) {
      event?.currentTarget?.parentElement?.parentElement?.children[1]?.children[2]?.classList.remove('hidden')
    } else {
      event?.currentTarget?.parentElement?.parentElement?.children[1]?.children[2]?.classList.add('hidden')
    }
 
    // @ts-ignore
    setFilters((prevFilter) => {
      // @ts-ignore
      return prevFilter.map((item: IFilterItemProps) => {
        return {
          ...item,
          // @ts-ignore
          operatorId: event.currentTarget.getAttribute('data-operator-id'),
        };
      });
    });
  };

  return (
    <nav className={`${tabPrefix}-container flex items-center`}>
      {
        tabItems.map((item: ITabsItemProps, index: number) => (
          <Button key={index}
            className={`${tabPrefix}-item px-0 py-0 w-1/${tabItems.length} flex justify-center items-center text-xs ${activeIndexId === index
              ? 'active'
              : ''
              }`}
            dataAttributes={{ 'data-operator-id': item.id?.toString() || '0' }}
            id={`${tabPrefix}-item-${index}`}
            type="button"
            onClick={(event) => handleClick(event, index)}
          >
            {item.title}
          </Button>
        ))
      }
    </nav>
  );
};

export default Tabs;
