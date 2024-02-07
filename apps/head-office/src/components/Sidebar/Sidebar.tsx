import { LocationIcon, CloseIcon, GiftBoxIcon, PersonIcon, FAQIcon } from '@projects/icons'
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Image } from '@projects/image';
import { toggleExpanded } from '../../../app/redux/features/isExpanded';
import { RootState } from '../../../app/redux/store';
import { userInfo } from '../../constants/styles';
import './Sidebar.css';
import { detectDevice } from '@projects/common';
import { useState, useEffect } from 'react';

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
  const [isDetectedDevice, setIsDetectedDevice] = useState(false);
  const isExpanded = useSelector((state: RootState) => state.expandedReducer.isExpanded);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  const handleClose = () => {
    dispatch(toggleExpanded(isExpanded))
  }

  return (
    isDetectedDevice && (
      <div className={`sh-sidebar-container shadow-custom h-screen flex flex-col justify-between ${isExpanded !== null ? (isExpanded ? 'expanded' : 'collapsed') : ''}`}>

        <div className="sh-sidebar-header flex items-center justify-between h-[77px]">
          <div className="sh-sidebar-header-logo mx-4">
            <Image alt={userInfo.name} src={userInfo.logo} />
          </div>
          <div className='sh-sidebar-header-close mx-4'>
            {
              detectDevice().isDesktop === false &&
              <CloseIcon onClick={handleClose} />
            }
          </div>
        </div>

        <div className='sh-sidebar-content flex items-center justify-center flex-col'>
          <ul className='w-full sidebar-list-wrapper flex flex-col'>
            {sidebarElement.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  <li key={index} className={`cursor-pointer sidebar-list-item ${index === sidebarElement.length - 1 ? '' : 'border-b'} `}>
                    <div className="sh-sidebar-item w-full flex justify-start p-4">
                      <span className="sh-sidebar-item-icon">
                        {item.icon}
                      </span>
                      <span className={`sh-sidebar-item-name pl-4 ${isExpanded !== null ? (isExpanded ? 'block' : 'hidden') : 'hidden'}`}>
                        {item.name}
                      </span>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>

        <div className='sh-sidebar-footer flex items-center justify-center'>
          <div className="sh-sidebar-footer-icon">
            <CloseIcon />
          </div>
          <div className={`sh-sidebar-footer-name ${isExpanded !== null ? (isExpanded ? 'block' : 'hidden') : 'hidden'}`}>
            Cikis Yap
          </div>
        </div>

      </div>
    )
  );
}

export default Sidebar;
