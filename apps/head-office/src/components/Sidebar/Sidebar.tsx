import { LocationIcon, CloseIcon, GiftBoxIcon, PersonIcon, FAQIcon } from '@projects/icons'
import { Image } from '@projects/image';
import { userInfo } from '../../constants/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/redux/store';
import './Sidebar.scss';
import Link from 'next/link';

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
    icon: <PersonIcon strokeColor={'black'} />
  },
  {
    name: 'FAQ',
    link: '/faq',
    icon: <FAQIcon />
  }
];

export function Sidebar(props: SidebarProps) {
  const isExpanded = useSelector((state: RootState) => state.expandedReducer.isExpanded);

  return (
    <div className={`sh-sidebar-container shadow-custom h-screen flex flex-col justify-between ${isExpanded !== null ? (isExpanded  ? 'expanded' : 'collapsed') : ''}`}>

      <div className="sh-sidebar-header flex items-center justify-between">
        <div className="sh-sidebar-header-logo mx-4">
          <Image alt={userInfo.name} src={userInfo.logo} />
        </div>
      </div>

      <div className='sh-sidebar-content flex items-center justify-center flex-col'>
        <ul className='w-full sidebar-list-wrapper'>
          {sidebarElement.map((item, index) => {
            return (
              <Link href={item.link} key={index}>
                <li key={index} className={`cursor-pointer sidebar-list-item ${index === sidebarElement.length - 1 ? '' : 'border-b'} `}>
                  <div className="sh-sidebar-item w-full flex justify-start p-4">
                    <span className="sh-sidebar-item-icon">
                      {item.icon}
                    </span>
                    <span className={`sh-sidebar-item-name pl-4 ${isExpanded !== null && (isExpanded ? 'block' : 'hidden')}`}>
                      {item.name}
                    </span>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
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
