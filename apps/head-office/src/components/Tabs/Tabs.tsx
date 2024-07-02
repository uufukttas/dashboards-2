import React, { useState } from 'react';
import { Button } from '@projects/button';
import { BRAND_PREFIX } from '../../constants/constants';
import type { ITabsItemProps, ITabsProps } from './types';
import './Tabs.css';

const Tabs: React.FC<ITabsProps> = ({ activeTabIndex, setActiveTabIndex, tabItems }: ITabsProps) => {
  const tabPrefix: string = `${BRAND_PREFIX}-tabs`;
  const [activeIndexId, setActiveIndexId] = useState<number>(activeTabIndex);

  setActiveTabIndex(activeIndexId);

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
            onClick={() => (setActiveIndexId(index))}
          >
            {item.title}
          </Button>
        ))
      }
    </nav>
  );
};

export default Tabs;
