import React from 'react';
import { FaCoins } from 'react-icons/fa';
import { FaLocationDot, FaClock, FaUserGear } from 'react-icons/fa6';
import { RiBattery2ChargeFill } from 'react-icons/ri';
import { SlEnergy } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { detectDevice } from '@projects/common';
import { BRAND_PREFIX } from '../../constants/constants';
import { setActiveTabIndex } from '../../../app/redux/features/activeTabIndex';
import { RootState } from '../../../app/redux/store';
import type { ITabsItemProps } from './types';
import './Tabs.css';

const Tabs: React.FC = () => {
  const tabItems: ITabsItemProps[] = [
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
  const tabPrefix: string = `${BRAND_PREFIX}-tabs`;
  const dispatch = useDispatch();
  const activeTabIndex = useSelector((state: RootState) => state.activeTabIndex);

  return (
    <nav className={`${tabPrefix}-container flex items-center`}>
      {
        tabItems.map((item: ITabsItemProps, index: number) => (
          <Button key={index}
            className={`${tabPrefix}-item px-4 py-0 w-1/6 flex justify-center items-center text-2xl ${
              activeTabIndex === index
                ? 'active'
                : ''
              }`
            }
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
