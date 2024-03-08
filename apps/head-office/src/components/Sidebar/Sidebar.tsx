import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { detectDevice } from '@projects/common';
import { LocationIcon, CloseIcon, GiftBoxIcon, PersonIcon, FAQIcon } from '@projects/icons';
import { Image } from '@projects/image';
import { BRAND_PREFIX } from '../../constants/constants';
import { userInfo } from '../../constants/styles';
import { toggleSidebarExpanded } from '../../../app/redux/features/isSidebarExpand';
import { RootState } from '../../../app/redux/store';
import './Sidebar.css';

const sidebarElements = [
  {
    name: 'Hizmet Noktasi',
    link: '/service-points',
    icon: <LocationIcon />,
  },
  {
    name: 'Kampanyalar',
    link: '/campaigns',
    icon: <GiftBoxIcon />,
  },
  {
    name: 'Kullanici Yonetimi',
    link: '/user-managements',
    icon: <PersonIcon />,
  },
  {
    name: 'FAQ',
    link: '/faq',
    icon: <FAQIcon />,
  },
];

const Sidebar = () => {
  const isSidebarExpanded = useSelector((state: RootState) => state.sidebarExpandReducer.isSidebarExpanded);
  const [isDetectedDevice, setIsDetectedDevice] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSidebarClose = () => {
    dispatch(toggleSidebarExpanded(isSidebarExpanded));
  };

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  return (
    isDetectedDevice && (
      <div className={`${BRAND_PREFIX}-sidebar-container shadow-custom h-screen flex flex-col justify-between ${isSidebarExpanded !== null ? (isSidebarExpanded ? 'expanded' : 'collapsed') : ''}`}>
        <div className={`${BRAND_PREFIX}-sidebar-header-container flex items-center justify-between h-[80px]`}>
          <div className={`${BRAND_PREFIX}-sidebar-header-logo-container mx-4`}>
            <Image alt={userInfo.name} className={`${BRAND_PREFIX}-sidebar-header-logo`} src={userInfo.logo} />
          </div>
          {
            detectDevice().isDesktop === false &&
            <div className={`${BRAND_PREFIX}-sidebar-header-close-container mx-4`}>
              <Button className={`${BRAND_PREFIX}-sidebar-header-close-button`} type='button' onClick={handleSidebarClose}>
                <CloseIcon />
              </Button>
            </div>
          }
        </div>
        <div className={`${BRAND_PREFIX}-sidebar-body-container flex items-center justify-center flex-col`}>
          <ul className={`${BRAND_PREFIX}-sidebar-list-container w-full flex flex-col`}>
            {
              sidebarElements.map((item, index) => {
                return (
                  <Link className={`${BRAND_PREFIX}-sidebar-list`} href={item.link} key={index}>
                    <li className={`${BRAND_PREFIX}-sidebar-list-item cursor-pointer ${index === sidebarElements.length - 1 ? '' : 'border-b'} `}>
                      <div className={`${BRAND_PREFIX}-sidebar-item-container w-full flex justify-start p-4`}>
                        <span className={`${BRAND_PREFIX}-sidebar-item-icon`}>
                          {item.icon}
                        </span>
                        <span className={`${BRAND_PREFIX}-sidebar-item-name pl-4 ${isSidebarExpanded !== null ? (isSidebarExpanded ? 'block' : 'hidden') : 'hidden'}`}>
                          {item.name}
                        </span>
                      </div>
                    </li>
                  </Link>
                );
              })
            }
          </ul>
        </div>
        <div className={`${BRAND_PREFIX}-sidebar-footer-container flex items-center justify-center`}>
          <div className={`${BRAND_PREFIX}-sidebar-footer-icon-container`}>
            <CloseIcon />
          </div>
        </div>
      </div>
    )
  );
};

export default Sidebar;
