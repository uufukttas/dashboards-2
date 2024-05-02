import React from 'react';
import { FaAlignJustify, FaUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleSidebarExpanded } from '../../../app/redux/features/isSidebarExpand';
import { RootState, AppDispatch } from '../../../app/redux/store';
import type { IHeaderProps } from './types';
import './Header.css';

const Header: React.FC<IHeaderProps> = ({ className }: IHeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);

  return (
    <div className={`${BRAND_PREFIX}-header-container justify-between border-b border-gray-300 bg-background top-0 z-10 sticky ${className}`}>
      <div className={`${BRAND_PREFIX}-sidebar-toggle-button-container`}>
        <Button
          className={`${BRAND_PREFIX}-sidebar-toggle-button bg-background hover:bg-background mx-8 py-2 px-2`}
          id={`${BRAND_PREFIX}-sidebar-toggle-button`}
          type='button'
          onClick={() => dispatch(toggleSidebarExpanded(isSidebarExpanded))}
        >
          <FaAlignJustify />
        </Button>
      </div>
      <div className={`${BRAND_PREFIX}-profile-button-container`}>
        <Button
          className={`${BRAND_PREFIX}-profile-button bg-white hover:bg-white border border-[#eceece] flex items-center mx-8 rounded-full px-2 py-2`}
          id={`${BRAND_PREFIX}-header-profile-button`}
          type='button'
          onClick={() => { }}
        >
          <FaUser />
        </Button>
      </div>
    </div>
  );
};

export default Header;
