import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { BRAND_PREFIX } from '../../constants/constants';
import { setActiveTabIndex } from '../../../app/redux/features/activeTabIndex';
import { RootState } from '../../../app/redux/store';
import type { ITabsItemProps, ITabsProps } from './types';
import './Tabs.css';

const Tabs: React.FC<ITabsProps> = ({ tabItems }: ITabsProps) => {
  const tabPrefix: string = `${BRAND_PREFIX}-tabs`;
  const dispatch = useDispatch();
  const activeTabIndex = useSelector((state: RootState) => state.activeTabIndex);

  return (
    <nav className={`${tabPrefix}-container flex items-center`}>
      {
        tabItems.map((item: ITabsItemProps, index: number) => (
          <Button key={index}
            className={`${tabPrefix}-item px-0 py-0 w-1/${tabItems.length} flex justify-center items-center text-xs ${activeTabIndex === index
              ? 'active'
              : ''
              }`}
            id={`${tabPrefix}-item-${index}`}
            type="button"
            onClick={() => dispatch(setActiveTabIndex(index))}
          >
            {item.title}
          </Button>
        ))
      }
    </nav>
  );
};

export default Tabs;
