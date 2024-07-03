import React, { useEffect, useState } from 'react';
import { Button } from '@projects/button';
import { BRAND_PREFIX } from '../../constants/constants';
import type { ITabsItemProps, ITabsProps } from './types';
import './Tabs.css';

const Tabs: React.FC<ITabsProps> = ({ activeTabIndex, setActiveTabIndex, tabItems, filters }: ITabsProps) => {
  const tabPrefix: string = `${BRAND_PREFIX}-tabs`;
  const [activeIndexId, setActiveIndexId] = useState<number>(activeTabIndex);

  setActiveTabIndex(activeIndexId);

  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setActiveIndexId(index);

    const container = event.currentTarget.closest(`.${tabPrefix}-container`);
    if (!container) return;

    const itemContainer = container.closest('div.sh-filter-container');
    if (!itemContainer) return;

    const childrenArray = Array.from(itemContainer.children);
    const parentElement = event.currentTarget.parentElement?.parentElement?.parentElement;

    if (!parentElement) return;

    const childIndex = childrenArray.indexOf(parentElement);

    if (childIndex !== -1 && filters) {
      filters[childIndex].operatorId = index;
      console.log('filters[childIndex]', filters[childIndex]);
    }
  };

  useEffect(() => {
  }, [activeTabIndex])

  return (
    <nav className={`${tabPrefix}-container flex items-center`}>
      {
        tabItems.map((item: ITabsItemProps, index: number) => (
          <Button key={index}
            className={`${tabPrefix}-item px-0 py-0 w-1/${tabItems.length} flex justify-center items-center text-xs ${activeIndexId === index
              ? 'active'
              : ''
              }`}
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
