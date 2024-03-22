import React from 'react';
import Link from 'next/link';
import { FaLocationDot, FaGift, FaUser, FaQuestion } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';

const SidebarBody = () => {
    const sidebarElements = [
        {
            name: 'Lokasyonlar',
            link: '/service-points',
            icon: <FaLocationDot />,
        },
        {
            name: 'Kampanyalar',
            link: '/campaigns',
            icon: <FaGift />,
        },
        {
            name: 'Kullanici Yonetimi',
            link: '/user-managements',
            icon: <FaUser />,
        },
        {
            name: 'FAQ',
            link: '/faq',
            icon: <FaQuestion />,
        },
    ];
    const isSidebarExpanded = useSelector((state: RootState) => state.sidebarExpandReducer.isSidebarExpanded);

    return (
        <div className={`${BRAND_PREFIX}-sidebar-body-container flex items-center justify-center flex-col`}>
            <ul className={`${BRAND_PREFIX}-sidebar-list-container w-full flex flex-col`}>
                {sidebarElements.map((item, index) => {
                    return (
                        <li
                            className={`${BRAND_PREFIX}-sidebar-list-item cursor-pointer border-gray-300 w-full ${
                                index === sidebarElements.length - 1
                                    ? ''
                                    : 'border-b'
                                } hover:bg-secondary-lighter hover:text-white focus:bg-secondary-lighter focus:text-white`}
                            key={index}
                        >
                            <Link className={`${BRAND_PREFIX}-sidebar-list`} href={item.link}>
                                <div
                                    className={`${BRAND_PREFIX}-sidebar-item-container w-full flex p-4 ${
                                        isSidebarExpanded
                                            ? 'justify-start'
                                            : 'justify-center'
                                        }`}
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
                                            }`}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SidebarBody;
