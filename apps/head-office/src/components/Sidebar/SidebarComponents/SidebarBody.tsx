import React from 'react';
import { FaGift, FaLocationDot, FaUser, FaQuestion } from 'react-icons/fa6';
import { LuReceipt } from "react-icons/lu";
import { IoMdAnalytics } from "react-icons/io";
import { Tooltip } from '@projects/tooltip';
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
                { icon: <></>, link: '/reports/all-reports', name: 'Tüm Raporlar' },
                { icon: <></>, link: '/reports/charging-reports', name: 'Şarj Raporları' },
                { icon: <></>, link: '/reports/service-points-reports', name: 'İstasyon Raporları' }
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
                            <Tooltip
                                containerClassName='w-full'
                                key={index}
                                text={item.name}
                                textClassName='left-14'
                            >
                                <SidebarBodyItem
                                    index={index}
                                    item={item}
                                    sidebarElementsLength={sidebarElements.length}
                                />
                            </Tooltip>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default SidebarBody;
