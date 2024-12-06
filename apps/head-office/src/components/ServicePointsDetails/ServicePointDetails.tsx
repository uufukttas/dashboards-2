import React, { useMemo, useState } from 'react';
import { FaClock, FaCoins, FaLocationDot, FaUserGear } from 'react-icons/fa6';
import { RiBattery2ChargeFill } from 'react-icons/ri';
import { SlEnergy } from 'react-icons/sl';
import { detectDevice } from '@projects/common';
import ServicePointsDetailsContent from './ServicePointsDetailsComponents/ServicePointsDetailsContent';
import { BRAND_PREFIX } from '../../constants/constants';
import Tabs from '../Tabs/Tabs';
import './ServicePointDetails.css';
import type { IServicePointsDetailsPageProps, ITabsItemProps, ITabTitleProps } from './types';

const ServicePointsDetails: React.FC<IServicePointsDetailsPageProps> = ({ slug }: IServicePointsDetailsPageProps) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-details`;
  const stationId: number = Number(slug);
  const isMobile: boolean = useMemo(() => detectDevice().isMobile, []);
  const tabTitles: ITabTitleProps[] = [
    { icon: <FaLocationDot />, label: 'İstasyon Bilgileri' },
    { icon: <RiBattery2ChargeFill />, label: 'Şarj Üniteleri' },
    { icon: <FaClock />, label: 'Çalışma Saatleri' },
    { icon: <SlEnergy />, label: 'Enerji Fiyat Ayarlari' },
    { icon: <FaCoins />, label: 'Komisyonlar' },
    { icon: <FaUserGear />, label: 'İstasyon Yetkilileri' },
  ];
  const tabItems: ITabsItemProps[] = tabTitles.map(({ icon, label }: { icon: JSX.Element; label: string }) => ({
    title: (
      <>
        {icon}
        {!isMobile && label}
      </>
    ),
  }));
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <div className={`${sectionPrefix}-wrapper w-full`}>
      <div className={`${sectionPrefix}-container w-full`}>
        <Tabs activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} tabItems={tabItems} />
        <ServicePointsDetailsContent activeTabIndex={activeTabIndex} stationId={stationId} />
      </div>
    </div>
  );
};

export default ServicePointsDetails;
