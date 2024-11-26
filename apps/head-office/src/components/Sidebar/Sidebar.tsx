import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import SidebarBody from './SidebarComponents/SidebarBody';
import SidebarFooter from './SidebarComponents/SidebarFooter';
import SidebarHeader from './SidebarComponents/SidebarHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleSidebarExpanded } from '../../../app/redux/features/isSidebarExpand';
import { RootState } from '../../../app/redux/store';
import './Sidebar.css';

const SidebarComponent: React.FC = () => {
  const sidebarPrefix: string = `${BRAND_PREFIX}-sidebar`;
  const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);
  const dispatch = useDispatch();

  return (
    <Sidebar
      className={`${sidebarPrefix}-container w-1/6`}
      content={({ hide }) => (
        <div className={`${sidebarPrefix}-content-container min-h-screen flex relative`}>
          <div className={`${sidebarPrefix}-content flex flex-col h-full w-full`}>
            <SidebarHeader hide={hide} />
            <SidebarBody />
            <SidebarFooter />
          </div>
        </div >
      )}
      visible={isSidebarExpanded}
      onHide={() => dispatch(toggleSidebarExpanded(false))}
    />
  );
};

export default SidebarComponent;
