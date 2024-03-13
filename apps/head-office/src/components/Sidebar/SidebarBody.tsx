import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { FAQIcon, GiftBoxIcon, LocationIcon, PersonIcon } from '@projects/icons';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';

const SidebarBody = () => {
    const isSidebarExpanded = useSelector((state: RootState) => state.sidebarExpandReducer.isSidebarExpanded);
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
            icon: <PersonIcon />,
        },
        {
            name: 'FAQ',
            link: '/faq',
            icon: <FAQIcon />,
        },
    ];

    return (
        <div
            className={`${BRAND_PREFIX}-sidebar-body-container flex items-center justify-center flex-col`}
        >
            <ul
                className={`${BRAND_PREFIX}-sidebar-list-container w-full flex flex-col`}
            >
                {sidebarElements.map((item, index) => {
                    return (
                        <Link
                            className={`${BRAND_PREFIX}-sidebar-list`}
                            href={item.link}
                            key={index}
                        >
                            <li
                                className={`${BRAND_PREFIX}-sidebar-list-item cursor-pointer ${index === sidebarElements.length - 1 ? '' : 'border-b'
                                    } `}
                            >
                                <div
                                    className={`${BRAND_PREFIX}-sidebar-item-container w-full flex justify-start p-4`}
                                >
                                    <span className={`${BRAND_PREFIX}-sidebar-item-icon`}>
                                        {item.icon}
                                    </span>
                                    <span
                                        className={`${BRAND_PREFIX}-sidebar-item-name pl-4 ${isSidebarExpanded !== null
                                            ? isSidebarExpanded
                                                ? 'block'
                                                : 'hidden'
                                            : 'hidden'
                                            }`}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};

export default SidebarBody;
