import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SidebarBody from './SidebarComponents/SidebarBody';
import SidebarFooter from './SidebarComponents/SidebarFooter';
import SidebarHeader from './SidebarComponents/SidebarHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const sidebarPrefix: string = `${BRAND_PREFIX}-sidebar`;
  const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);
  const [isDetectedDevice, setIsDetectedDevice] = useState<boolean>(false);

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  return (
    isDetectedDevice && (
      <div
      className={`${sidebarPrefix}-container border-r border-gray-300 flex flex-col justify-between bg-background overflow-visible ${
          isSidebarExpanded !== null && (
            isSidebarExpanded
              ? 'expanded'
              : 'collapsed'
          )
        }`}
      >
        <SidebarHeader />
        <div className={`${sidebarPrefix}-content-container flex h-full flex-col justify-between`}>
          <SidebarBody />
          <SidebarFooter />
        </div>
      </div>
    )
  );
};

export default Sidebar;
