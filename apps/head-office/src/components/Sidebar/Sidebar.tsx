import { useState } from 'react';
import { LocationIcon, CloseIcon, GiftBoxIcon, PersonIcon, FAQIcon } from '@projects/icons'
import { Image } from '@projects/image';
import { userInfo } from '../../constants/styles';

export interface SidebarProps { }

const sidebarElement = [
  {
    name: 'Hizmet Noktasi',
    link: '/service-point',
    icon: <LocationIcon />
  },
  {
    name: 'Kampanyalar',
    link: '/campaigns',
    icon: <GiftBoxIcon />
  },
  {
    name: 'Kullanici Yonetimi',
    link: '/user-management',
    icon: <PersonIcon />
  },
  {
    name: 'FAQ',
    link: '/faq',
    icon: <FAQIcon />
  }
];

export function Sidebar(props: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`sh-sidebar-container ${isExpanded ? 'expanded' : 'collapsed'} shadow-custom w-1/4 h-screen flex flex-col justify-between`}>

      <div className="sh-sidebar-header flex items-center justify-between">
        <div className="sh-sidebar-header-logo mx-4">
          <Image alt={userInfo.name} src={userInfo.logo} />
        </div>
        <div className="sh-sidebar-header-toggle mx-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <CloseIcon />
        </div>
      </div>

      <div className='sh-sidebar-content flex items-center justify-center flex-col'>
        {sidebarElement.map((item, index) => {
          return (
            <div key={index} className="sh-sidebar-item w-full flex justify-start p-4 border border-b-0 border-r-0 ">
              <span className="sh-sidebar-item-icon">
                {item.icon}
              </span>
              <span className="sh-sidebar-item-name pl-4">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className='sh-sidebar-footer flex items-center'>
        <div className="sh-sidebar-footer-icon">
          <CloseIcon />
        </div>
        <div className="sh-sidebar-footer-name">
          Cikis Yap
        </div>
      </div>

    </div>
  );
}

export default Sidebar;
