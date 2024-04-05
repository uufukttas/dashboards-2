import React from 'react';
import { Button } from '@projects/button';
import { BRAND_PREFIX } from '../../constants/constants';
import type { INavbarItemProps, INavbarProps } from './types';
import './Navbar.css';

const Navbar = ({ activeIndex, items, setActiveIndex }: INavbarProps) => {
  const handleItemClick = (index: number) => setActiveIndex(index);

  return (
    <nav className={`${BRAND_PREFIX}-navbar-container lg:mx-8 flex items-center`}>
      {
        items.map((item: INavbarItemProps, index: number) => (
          <Button key={index}
            className={`${BRAND_PREFIX}-navbar-item px-4 py-0 w-1/6 flex justify-center items-center text-2xl ${
              activeIndex === index
                ? 'active'
                : ''}
              `}
            id={`${BRAND_PREFIX}-navbar-item-${index}`}
            type="button"
            onClick={() => handleItemClick(index)}
          >
            {item.title}
          </Button>
        ))
      }
    </nav>
  );
};

export default Navbar;
