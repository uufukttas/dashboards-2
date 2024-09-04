import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dropdown } from '@projects/dropdown';
import { BRAND_PREFIX } from '../../constants/constants';
import { getLanguageListRequest } from '../../../app/api/login/getLanguageListRequest';
import { toggleSidebarExpanded } from '../../../app/redux/features/isSidebarExpand';
import { RootState, AppDispatch } from '../../../app/redux/store';
import type { IDropdownItemProps, IHeaderProps } from './types';
import './Header.css';

const Header: React.FC<IHeaderProps> = ({ className, headerName }: IHeaderProps) => {
  const headerPrefix: string = `${BRAND_PREFIX}-header`;
  const dispatch = useDispatch<AppDispatch>();
  const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);
  const [languages, setLanguages] = useState([]);

  const getLanguageList = async (): Promise<void> => {
    const languageList = await getLanguageListRequest();
    setLanguages(
      languageList.map((language: IDropdownItemProps) => {
        return ({
          id: null,
          rid: language.id,
          name: language.name,
        })
      })
    );
  };

  useEffect(() => {
    getLanguageList();
  }, []);

  return (
    <div className={`${headerPrefix}-container justify-between border-b border-gray-300 bg-background px-20 py-4 top-0 z-10 sticky ${className}`}>
      <div className={`${headerPrefix}-header-left-side flex items-center`}>
        <div className={`${headerPrefix}-sidebar-toggle-button-container flex items-center`}>
          <Button
            className={`${headerPrefix}-sidebar-toggle-button bg-background hover:bg-background px-1 flex justify-start items-center`}
            icon="pi pi-align-justify"
            onClick={() => dispatch(toggleSidebarExpanded(isSidebarExpanded))}
            aria-controls={isSidebarExpanded ? 'sbar' : undefined}
            aria-expanded={isSidebarExpanded ? true : false}
          />
          <div className={`${headerPrefix}-header-name-container h-8 flex items-center justify-evenly`}>
            <h1 className={`${headerPrefix}-header-name text-xl font-semibold `}>{headerName}</h1>
          </div>
        </div>
      </div>
      <div className={`${headerPrefix}-header-right-side flex items-center`}>
        <div className={`${headerPrefix}-language-container mx-4`}>
          <Dropdown
            className='border text-text text-sm rounded-lg block w-full p-2.5 focus:ring-primary focus:border-primary'
            id='languages'
            items={languages}
            name='languages'
          />
        </div>
        <div className={`${headerPrefix}-profile-button-container`}>
          <Link
            className={`${headerPrefix}-profile-button bg-white hover:bg-white border border-[#eceece] flex items-center rounded-full px-2 py-2`}
            href='/profile'
          >
            <FaUser />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
