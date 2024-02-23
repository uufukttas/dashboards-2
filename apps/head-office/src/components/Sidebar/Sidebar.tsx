import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { detectDevice } from '@projects/common';
import { LocationIcon, CloseIcon, GiftBoxIcon, PersonIcon, FAQIcon } from '@projects/icons';
import { Image } from '@projects/image';
import { toggleExpanded } from '../../../app/redux/features/isSidebarExpand';
import { RootState } from '../../../app/redux/store';
import { userInfo } from '../../constants/styles';
import './Sidebar.css';

const sidebarElements = [
  {
    name: 'Hizmet Noktasi',
    link: '/service-points',
    icon: <LocationIcon />,
  },
  {
    name: 'Kampanyalar',
    link: '/campaigns',
    icon: <GiftBoxIcon />,
  },
  {
    name: 'Kullanici Yonetimi',
    link: '/user-managements',
    icon: <PersonIcon strokeColor={'black'} />,
  },
  {
    name: 'FAQ',
    link: '/faq',
    icon: <FAQIcon />,
  },
];

const Sidebar = () => {
  const isSidebarExpanded = useSelector((state: RootState) => state.sidebarExpandReducer.isSidebarExpanded);
  const [isDetectedDevice, setIsDetectedDevice] = useState(false);
  const dispatch = useDispatch();

  const handleSidebarClose = () => {
    dispatch(toggleExpanded(isSidebarExpanded));
  };

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  return (
    isDetectedDevice && (
      <div className={`sh-sidebar-container shadow-custom h-screen flex flex-col justify-between ${isSidebarExpanded !== null ? (isSidebarExpanded ? 'expanded' : 'collapsed') : ''}`}>
        <div className="sh-sidebar-header-container flex items-center justify-between h-[80px]">
          <div className="sh-sidebar-header-logo-container mx-4">
            <Image alt={userInfo.name} className={'sh-sidebar-header-logo'} src={userInfo.logo} />
          </div>
          {
            detectDevice().isDesktop === false &&
            <div className='sh-sidebar-header-close-container mx-4'>
              <CloseIcon className={'sh-sidebar-header-close'} onClick={handleSidebarClose} />
            </div>
          }
        </div>
        <div className="sh-sidebar-body-container flex items-center justify-center flex-col">
          <ul className="sh-sidebar-list-container w-full flex flex-col">
            {
              sidebarElements.map((item, index) => {
                return (
                  <Link className={'sh-sidebar-list'} href={item.link} key={index}>
                    <li className={`sh-sidebar-list-item cursor-pointer ${index === sidebarElements.length - 1 ? '' : 'border-b'} `}>
                      <div className="sh-sidebar-item-container w-full flex justify-start p-4">
                        <span className="sh-sidebar-item-icon">
                          {item.icon}
                        </span>
                        <span className={`sh-sidebar-item-name pl-4 ${isSidebarExpanded !== null ? (isSidebarExpanded ? 'block' : 'hidden') : 'hidden'}`}>
                          {item.name}
                        </span>
                      </div>
                    </li>
                  </Link>
                );
              })
            }
          </ul>
        </div>
        <div className="sh-sidebar-footer-container flex items-center justify-center">
          <div className="sh-sidebar-footer-icon-container">
            <CloseIcon className={'sh-sidebar-footer-icon'} />
          </div>
        </div>
      </div>
    )
  );
};

export default Sidebar;
