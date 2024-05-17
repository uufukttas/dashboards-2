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
            name: 'Istasyonlar',
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
    const sidebarPrefix = `${BRAND_PREFIX}-sidebar`;
    const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);

    return (
        <div className={`${sidebarPrefix}-body-container flex items-center justify-center flex-col`}>
            <ul className={`${sidebarPrefix}-list-container w-full flex flex-col`}>
                {
                    sidebarElements.map((item, index) => {
                        return (
                            <li
                                className={`${sidebarPrefix}-list-item cursor-pointer border-gray-300 w-full ${
                                    index === sidebarElements.length - 1
                                        ? ''
                                        : 'border-b'
                                    } hover:bg-primary hover:text-white focus:bg-secondary-lighter focus:text-white`}
                                key={index}
                            >
                                <Link className={`${sidebarPrefix}-list`} href={item.link}>
                                    <div className={`${sidebarPrefix}-item-container w-full flex p-4 ${
                                        isSidebarExpanded
                                            ? 'justify-start'
                                            : 'justify-center'
                                        }
                                    `}
                                    >
                                        <span className={`${sidebarPrefix}-item-icon`}>
                                            {item.icon}
                                        </span>
                                        <span
                                            className={`${sidebarPrefix}-item-name pl-4 ${
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
