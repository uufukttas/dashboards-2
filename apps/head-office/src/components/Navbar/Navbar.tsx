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
          {detectDevice().isMobile ? '' : 'Istasyon Bilgisi'}
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
            detectDevice().isMobile ? '' : 'Istasyon Yetkisi'
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
  const navbarPrefix = `${BRAND_PREFIX}-navbar`;
  return (
    <nav className={`${navbarPrefix}-container flex items-center`}>
      {
        navbarItems.map((item: INavbarItemProps, index: number) => (
          <Button key={index}
            className={`${navbarPrefix}-item px-4 py-0 w-1/6 flex justify-center items-center text-2xl ${
              activeIndex === index
                ? 'active'
                : ''
              }`
            }
            id={`${navbarPrefix}-item-${index}`}
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
