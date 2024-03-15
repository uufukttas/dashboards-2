import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';
import './Sidebar.css';
import SidebarHeader from './SidebarHeader';
import SidebarFooter from './SidebarFooter';
import SidebarBody from './SidebarBody';

const Sidebar = () => {
  const isSidebarExpanded = useSelector(
    (state: RootState) => state.sidebarExpandReducer.isSidebarExpanded
  );
  const [isDetectedDevice, setIsDetectedDevice] = useState<boolean>(false);

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  return (
    isDetectedDevice && (
      <div
        className={`${BRAND_PREFIX}-sidebar-container border-r border-gray-300 h-screen flex flex-col justify-between ${isSidebarExpanded !== null
          ? isSidebarExpanded
            ? 'expanded'
            : 'collapsed'
          : ''
          }`}
      >
        <SidebarHeader />
        <SidebarBody />
        <SidebarFooter />
      </div>
    )
  );
};

export default Sidebar;
