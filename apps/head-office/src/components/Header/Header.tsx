import React from 'react';
import { FaAlignJustify, FaUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleSidebarExpanded } from '../../../app/redux/features/isSidebarExpand';
import { RootState, AppDispatch } from '../../../app/redux/store';
import type { IHeaderProps } from './types';
import './Header.css';
import Link from 'next/link';

const Header: React.FC<IHeaderProps> = ({ className }: IHeaderProps) => {
  const headerPrefix: string = `${BRAND_PREFIX}-header`;
  const dispatch = useDispatch<AppDispatch>();
  const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);

  return (
    <div className={`${headerPrefix}-container justify-between border-b border-gray-300 bg-background top-0 z-10 sticky ${className}`}>
      <div className={`${headerPrefix}-sidebar-toggle-button-container`}>
        <Button
          className={`${headerPrefix}-sidebar-toggle-button bg-background hover:bg-background mx-8 py-2 px-2`}
          id={`${headerPrefix}-sidebar-toggle-button`}
          type='button'
          onClick={() => dispatch(toggleSidebarExpanded(isSidebarExpanded))}
        >
          <FaAlignJustify />
        </Button>
      </div>
      <div className={`${headerPrefix}-profile-button-container`}>

        <Link
          className={`${headerPrefix}-profile-button bg-white hover:bg-white border border-[#eceece] flex items-center mx-8 rounded-full px-2 py-2`}
          href='/profile'
        >
          <FaUser />
        </Link>
      </div>
    </div>
  );
};

export default Header;
