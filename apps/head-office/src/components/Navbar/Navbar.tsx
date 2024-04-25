import React from 'react';
import { FaCoins } from 'react-icons/fa';
import { FaLocationDot, FaClock, FaUserGear } from 'react-icons/fa6';
import { RiBattery2ChargeFill } from 'react-icons/ri';
import { SlEnergy } from 'react-icons/sl';
import { Button } from '@projects/button';
import { detectDevice } from '@projects/common';
import { BRAND_PREFIX } from '../../constants/constants';
import type { INavbarItemProps, INavbarProps } from './types';
import './Navbar.css';

const Navbar: React.FC<INavbarProps> = ({ activeIndex, setActiveIndex }: INavbarProps) => {
  const navbarItems = [
    {
      title: (
        <>
          <FaLocationDot />
          {detectDevice().isMobile ? '' : 'Lokasyon Bilgiler'}
        </>
      ),
    },
    {
      title: (
        <>
          <RiBattery2ChargeFill />
          {detectDevice().isMobile ? '' : 'Sarj Üniteleri'}
        </>
      ),
    },
    {
      title: (
        <>
          <FaClock />
          {
            detectDevice().isMobile ? '' : 'Çalışma Saatleri'
          }
        </>
      ),
    },
    {
      title: (
        <>
          <SlEnergy />
          {
            detectDevice().isMobile ? '' : 'Enerji Fiyat Ayarlari'
          }
        </>
      ),
    },
    {
      title: (
        <>
          <FaUserGear />
          {
            detectDevice().isMobile ? '' : 'Servis Noktasi Yetkisi'
          }
        </>
      ),
    },
    {
      title: (
        <>
          <FaCoins />
          {
            detectDevice().isMobile ? '' : 'Komisyonlar'
          }
        </>
      ),
    },
  ];

  return (
    <nav className={`${BRAND_PREFIX}-service-point-details-page-navbar-container lg:mx-8 flex items-center`}>
      {
        navbarItems.map((item: INavbarItemProps, index: number) => (
          <Button key={index}
            className={`${BRAND_PREFIX}-navbar-item px-4 py-0 w-1/6 flex justify-center items-center text-2xl ${
              activeIndex === index
                ? 'active'
                : ''
              }`
            }
            id={`${BRAND_PREFIX}-navbar-item-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
          >
            {item.title}
          </Button>
        ))
      }
    </nav>
  );
};

export default Navbar;
