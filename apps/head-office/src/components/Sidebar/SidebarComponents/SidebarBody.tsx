import React from 'react';
import { BRAND_PREFIX, sidebarItems } from '../../../constants/constants';
import SidebarBodyItem from './SidebarBodyItem';

const SidebarBody: React.FC = () => {
  const sidebarPrefix: string = `${BRAND_PREFIX}-sidebar`;

  return (
    <div className={`${sidebarPrefix}-sidebar-content-container overflow-y-auto`}>
      <ul className={`${sidebarPrefix}-content-list-container list-none p-3 m-0`}>
        {sidebarItems.map((item, index) => {
          return <SidebarBodyItem item={item} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default SidebarBody;
