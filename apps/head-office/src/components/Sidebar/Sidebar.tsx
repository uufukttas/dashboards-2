import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { detectDevice } from '@projects/common';
import { LocationIcon, CloseIcon, GiftBoxIcon, PersonIcon, FAQIcon } from '@projects/icons'
import { Image } from '@projects/image';
import { toggleExpanded } from '../../../app/redux/features/isExpanded';
import { RootState } from '../../../app/redux/store';
import { userInfo } from '../../constants/styles';
import './Sidebar.css';

const sidebarElements = [
  {
    name: 'Hizmet Noktasi',
    link: '/service-point',
    icon: <LocationIcon />,
  },
  {
    name: 'Kampanyalar',
    link: '/campaigns',
    icon: <GiftBoxIcon />,
  },
  {
    name: 'Kullanici Yonetimi',
    link: '/user-management',
    icon: <PersonIcon strokeColor={'black'} />,
  },
  {
    name: 'FAQ',
    link: '/faq',
    icon: <FAQIcon />,
  },
];

export function Sidebar() {
  const dispatch = useDispatch();
  const [isDetectedDevice, setIsDetectedDevice] = useState(false);
  const isExpanded = useSelector((state: RootState) => state.expandedReducer.isExpanded);

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  const handleSidebarClose = () => {
    dispatch(toggleExpanded(isExpanded));
  };

  return (
    isDetectedDevice && (
      <div className={`sh-sidebar-container shadow-custom h-screen flex flex-col justify-between ${isExpanded !== null ? (isExpanded ? 'expanded' : 'collapsed') : ''}`}>
        <div className="sh-sidebar-header flex items-center justify-between h-[80px]">
          <div className="sh-sidebar-header-logo mx-4">
            <Image alt={userInfo.name} src={userInfo.logo} />
          </div>
          {
            detectDevice().isDesktop === false &&
            <div className='sh-sidebar-header-close mx-4'>
              <CloseIcon onClick={handleSidebarClose} />
            </div>
          }
        </div>

        <div className='sh-sidebar-body flex items-center justify-center flex-col'>
          <ul className='sh-sidebar-list-container w-full flex flex-col'>
            {
              sidebarElements.map((item, index) => {
                return (
                  <Link href={item.link} key={index}>
                    <li key={index} className={`sh-sidebar-list-item cursor-pointer ${index === sidebarElements.length - 1 ? '' : 'border-b'} `}>
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
              })
            }
          </ul>
        </div>

        <div className='sh-sidebar-footer flex items-center justify-center'>
          <div className="sh-sidebar-footer-icon">
            <CloseIcon />
          </div>
        </div>

      </div>
    )
  );
};

export default Sidebar;
