import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import type { ISidebarBodyItemProps, ISidebarElementProps } from '../types';

const SidebarBodyItem: React.FC<ISidebarBodyItemProps> = ({ index, item, sidebarElementsLength }: ISidebarBodyItemProps) => {
    const sidebarPrefix: string = `${BRAND_PREFIX}-sidebar`;
    const isLinkedSidebarItems = typeof item.subItems === 'undefined';
    const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);
    const [isOpenSubItems, setIsOpenSubItems] = useState(false);

    const renderSubItems = (subItems: ISidebarElementProps[]) => (
        <ul className='ml-2'>
            {subItems.map((subItem, subIndex) => (
                <Link href={subItem.link} key={subIndex}>
                    <li
                        key={subIndex}
                        className={`${sidebarPrefix}-list-item cursor-pointer border-gray-300 w-full border-b border-t hover:bg-primary hover:text-white focus:bg-secondary-lighter focus:text-white`}
                    >
                        <div className={`${sidebarPrefix}-item-container w-full flex p-2 pl-8 justify-between text-sm`}>
                            <div className="flex items-center justify-center">
                                <span className={`${sidebarPrefix}-item-icon`}>{subItem.icon}</span>
                                {isSidebarExpanded && <span className={`${sidebarPrefix}-item-name pl-4 block`}>{subItem.name}</span>}
                            </div>
                        </div>
                    </li>
                </Link>
            ))}
        </ul>
    );

    return (
        isLinkedSidebarItems ? (
            <Link href={item.link}>
                <li
                    className={`${sidebarPrefix}-list-item cursor-pointer border-gray-300 w-full ${index === sidebarElementsLength - 1 ? '' : 'border-b'}  focus:bg-secondary-lighter focus:text-white`}
                >
                    <div className={`${sidebarPrefix}-item-container w-full flex p-4 justify-between hover:bg-primary hover:text-white`} onClick={() => setIsOpenSubItems(!isOpenSubItems)}>
                        <div className="flex items-center justify-center">
                            <span className={`${sidebarPrefix}-item-icon`}>{item.icon}</span>
                            {isSidebarExpanded && <span className={`${sidebarPrefix}-item-name pl-4 block`}>{item.name}</span>}
                        </div>
                        {item.subItems && isSidebarExpanded && <span>▼</span>}  {/* Show an arrow or indicator */}
                    </div>
                    {isOpenSubItems && item.subItems && renderSubItems(item.subItems)}
                </li>
            </Link>
        ) : (
            <li
                className={`${sidebarPrefix}-list-item cursor-pointer border-gray-300 w-full ${index === sidebarElementsLength - 1 ? '' : 'border-b'}  focus:bg-secondary-lighter focus:text-white`}
            >
                <div className={`${sidebarPrefix}-item-container w-full flex p-4 justify-between hover:bg-primary hover:text-white`} onClick={() => setIsOpenSubItems(!isOpenSubItems)}>
                    <div className="flex items-center justify-center">
                        <span className={`${sidebarPrefix}-item-icon`}>{item.icon}</span>
                        {isSidebarExpanded && <span className={`${sidebarPrefix}-item-name pl-4 block`}>{item.name}</span>}
                    </div>
                    {item.subItems && isSidebarExpanded && <span>▼</span>}
                </div>
                {isOpenSubItems && item.subItems && renderSubItems(item.subItems)}
            </li>
        )
    );
};

export default SidebarBodyItem;
