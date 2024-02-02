import { LocationIcon, CloseIcon, GiftBoxIcon, PersonIcon, FAQIcon } from '@projects/icons'
import { Image } from '@projects/image';
import { userInfo } from '../../constants/styles';
import { useSelector } from 'react-redux';
import { RootState } from 'apps/head-office/app/redux/store';
import './Sidebar.scss';

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
    <div className={`sh-sidebar-container shadow-custom h-screen flex flex-col justify-between ${isExpanded !== null && (isExpanded  ? 'expanded' : 'collapsed')}`}>

      <div className="sh-sidebar-header flex items-center justify-between">
        <div className="sh-sidebar-header-logo mx-4">
          <Image alt={userInfo.name} src={userInfo.logo} />
        </div>
      </div>

      <div className='sh-sidebar-content flex items-center justify-center flex-col'>
        {sidebarElement.map((item, index) => {
          return (
            <div key={index} className="sh-sidebar-item w-full flex justify-start p-4">
              <span className="sh-sidebar-item-icon">
                {item.icon}
              </span>
              <span className={`sh-sidebar-item-name pl-4 ${isExpanded !== null && (isExpanded ? 'block' : 'hidden')}`}>
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
