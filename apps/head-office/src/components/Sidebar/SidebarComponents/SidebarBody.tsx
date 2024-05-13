import React from 'react';
import Link from 'next/link';
import { FaGift, FaLocationDot, FaUser, FaQuestion } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { BRAND_PREFIX } from '../../../constants/constants';
import { RootState } from '../../../../app/redux/store';
import type { ISidebarElementProps } from '../types';

const SidebarBody: React.FC = () => {
    const sidebarElements: ISidebarElementProps[] = [
        {
            icon: <FaLocationDot />,
            link: '/service-points',
            name: 'Servis Noktalari',
        },
        {
            icon: <FaUser />,
            link: '/users-management',
            name: 'Kullanici Yonetimi',
        },
        {
            icon: <FaGift />,
            link: '/campaigns',
            name: 'Kampanyalar',
        },
        {
            icon: <FaQuestion />,
            link: '/faq',
            name: 'FAQ',
        },
    ];
    const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);

    return (
        <div className={`${BRAND_PREFIX}-sidebar-body-container flex items-center justify-center flex-col`}>
            <ul className={`${BRAND_PREFIX}-sidebar-list-container w-full flex flex-col`}>
                {
                    sidebarElements.map((item, index) => {
                        return (
                            <li
                                className={`${BRAND_PREFIX}-sidebar-list-item cursor-pointer border-gray-300 w-full ${
                                    index === sidebarElements.length - 1
                                        ? ''
                                        : 'border-b'
                                    } hover:bg-primary hover:text-white focus:bg-secondary-lighter focus:text-white`}
                                key={index}
                            >
                                <Link className={`${BRAND_PREFIX}-sidebar-list`} href={item.link}>
                                    <div className={`${BRAND_PREFIX}-sidebar-item-container w-full flex p-4 ${
                                        isSidebarExpanded
                                            ? 'justify-start'
                                            : 'justify-center'
                                        }
                                    `}
                                    >
                                        <span className={`${BRAND_PREFIX}-sidebar-item-icon`}>
                                            {item.icon}
                                        </span>
                                        <span
                                            className={`${BRAND_PREFIX}-sidebar-item-name pl-4 ${
                                                isSidebarExpanded !== null
                                                    ? isSidebarExpanded
                                                        ? 'block'
                                                        : 'hidden'
                                                    : 'hidden'
                                                }
                                            `}
                                        >
                                            {item.name}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default SidebarBody;
