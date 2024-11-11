import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dropdown } from '@projects/dropdown';
import { BRAND_PREFIX, userInfo } from '../../constants/constants';
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
    console.log('userInfo', userInfo)
  }, []);

  return (
    <div className={`${headerPrefix}-container justify-between border-b-4 border-primary bg-background px-20 py-4 top-0 z-10 sticky ${className}`}>
      <div className={`${headerPrefix}-sidebar-toggle-button-container flex items-center w-1/3`}>
        <Button
          aria-controls={isSidebarExpanded ? 'sbar' : undefined}
          aria-expanded={isSidebarExpanded ? true : false}
          className={`${headerPrefix}-sidebar-toggle-button px-1 flex justify-start items-center`}
          icon="pi pi-align-justify"
          onClick={() => dispatch(toggleSidebarExpanded(true))}
        />
        <div className={`${headerPrefix}-name-container h-8 flex items-center justify-evenly`}>
          <h1 className={`${headerPrefix}-name text-xl font-semibold `}>{headerName}</h1>
        </div>
      </div>
      <div className={`${headerPrefix}-logo-container w-1/3 flex justify-center`}>
        <Link href='/dashboards'>
          <Image
            alt={`${userInfo.name} logo`}
            className={`${headerPrefix}-logo`}
            height={175}
            src={userInfo.logo}
            width={175}
          />
        </Link>
      </div>
      <div className={`${headerPrefix}-profile-button-container w-1/3 flex justify-end`}>
        <Link
          className={`${headerPrefix}-profile-button w-[50px] bg-white justify-end hover:bg-white flex items-center rounded-full px-2 py-2 border-b-4 border-primary`}
          href='/profile'
        >
          <Image
            alt='profile'
            className='w-[50px] rounded-full'
            height={50}
            src={`${userInfo.profileImage}`}
            width={50}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
