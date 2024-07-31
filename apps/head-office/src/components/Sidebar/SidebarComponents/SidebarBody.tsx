import React from 'react';
import { FaGift, FaLocationDot, FaUser, FaQuestion } from 'react-icons/fa6';
import { PiArrowElbowDownRightBold } from "react-icons/pi";
import { LuReceipt } from "react-icons/lu";
import { IoMdAnalytics } from "react-icons/io";
import SidebarBodyItem from './SidebarBodyItem';
import { BRAND_PREFIX } from '../../../constants/constants';
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
            icon: <IoMdAnalytics />,
            link: '/reports',
            name: 'Rapor Merkezi',
            subItems: [
                {
                    icon: <PiArrowElbowDownRightBold />,
                    link: '/reports/all-reports',
                    name: 'Tüm Raporlar'
                },
                {
                    icon: <PiArrowElbowDownRightBold />,
                    link: '/reports/charging-reports',
                    name: 'Şarj Raporları'
                },
                {
                    icon: <PiArrowElbowDownRightBold />,
                    link: '/reports/service-points-reports',
                    name: 'İstasyon Raporları'
                }
            ]
        },
        {
            icon: <LuReceipt />,
            link: '/tariffs-management',
            name: 'Tarifeler',
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
    const sidebarPrefix: string = `${BRAND_PREFIX}-sidebar`;

    return (
        <div className={`${sidebarPrefix}-body-container flex items-center justify-center flex-col`}>
            <ul className={`${sidebarPrefix}-list-container w-full flex flex-col`}>
                {
                    sidebarElements.map((item: ISidebarElementProps, index: number) => {
                        return (
                            <SidebarBodyItem
                                index={index}
                                item={item}
                                key={index}
                                sidebarElementsLength={sidebarElements.length}
                            />
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default SidebarBody;
