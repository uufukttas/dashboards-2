import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import type { ISidebarBodyItemProps } from '../types';

const SidebarBodyItem: React.FC<ISidebarBodyItemProps> = ({ index, item, sidebarElementsLength }: ISidebarBodyItemProps) => {
    const sidebarPrefix: string = `${BRAND_PREFIX}-sidebar`;
    const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);

    return (
        <li
            className={`${sidebarPrefix}-list-item cursor-pointer border-gray-300 w-full ${index === sidebarElementsLength - 1
                    ? ''
                    : 'border-b'
                } hover:bg-primary hover:text-white focus:bg-secondary-lighter focus:text-white`}
            key={index}
        >
            <Link className={`${sidebarPrefix}-list`} href={item.link}>
                <div className={`${sidebarPrefix}-item-container w-full flex p-4 ${isSidebarExpanded
                    ? 'justify-start'
                    : 'justify-center'
                    }
                `}
                >
                    <span className={`${sidebarPrefix}-item-icon`}>
                        {item.icon}
                    </span>
                    <span
                        className={`${sidebarPrefix}-item-name pl-4 ${isSidebarExpanded !== null
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
};

export default SidebarBodyItem;
