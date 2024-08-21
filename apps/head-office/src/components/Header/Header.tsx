import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaAlignJustify, FaUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { detectDevice } from '@projects/common';
import { Dropdown } from '@projects/dropdown';
import { BRAND_PREFIX } from '../../constants/constants';
import { getLanguageListRequest } from '../../../app/api/login/getLanguageListRequest';
import { toggleSidebarExpanded } from '../../../app/redux/features/isSidebarExpand';
import { RootState, AppDispatch } from '../../../app/redux/store';
import type { IDropdownItemProps, IHeaderProps } from './types';
import './Header.css';

const Header: React.FC<IHeaderProps> = ({ className, headerName }: IHeaderProps) => {
  const headerPrefix: string = `${BRAND_PREFIX}-header`;
  const isMobile: boolean = detectDevice().isMobile;
  const isTablet: boolean = detectDevice().isTablet;
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
    <div className={`${headerPrefix}-container justify-between border-b border-gray-300 bg-background top-0 z-10 sticky ${className}`}>
      <div className={`${headerPrefix}-header-left-side flex items-center w-1/2`}>
        <div className={`${headerPrefix}-sidebar-toggle-button-container flex items-center w-full`}>
          {
            (isMobile || isTablet) && (
              <Button
                className={`${headerPrefix}-sidebar-toggle-button bg-background hover:bg-background ml-8 py-2 px-2`}
                id={`${headerPrefix}-sidebar-toggle-button`}
                type='button'
                onClick={() => dispatch(toggleSidebarExpanded(isSidebarExpanded))}
              >
                <FaAlignJustify />
              </Button>
            )
          }
          <div className={`${headerPrefix}-header-name-container h-8 flex items-center justify-evenly w-3/4 md:w-full md:justify-start lg:px-20`}>
            <h1 className={`${headerPrefix}-header-name text-md md:text-xl font-semibold py-4`}>{headerName}</h1>
          </div>
        </div>
      </div>
      <div className={`${headerPrefix}-header-right-side flex items-center md:justify-end w-1/2 px-8`}>
        <div className={`${headerPrefix}-language-container w-3/4 md:w-1/4`}>
          <Dropdown
            className='border text-text text-sm rounded-lg block w-full p-2.5 focus:ring-primary focus:border-primary'
            id='languages'
            items={languages}
            name='languages'
          />
        </div>
        <div className={`${headerPrefix}-profile-button-container w-1/4 md:w-1/6`}>
          <Link
            className={`${headerPrefix}-profile-button flex items justify-center bg-white hover:bg-white px-1 py-2 mx-2`}
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
