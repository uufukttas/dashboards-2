import React from 'react';
import SidebarBodyItem from './SidebarBodyItem';
import { BRAND_PREFIX, sidebarItems } from '../../../constants/constants';
import type { ISidebarElementProps } from '../types';

const SidebarBody: React.FC = () => {
    const sidebarPrefix: string = `${BRAND_PREFIX}-sidebar`;

    return (
        <div className={`${sidebarPrefix}-body-container flex items-center justify-center flex-col`}>
            <ul className={`${sidebarPrefix}-list-container w-full flex flex-col`}>
                {
                    sidebarItems.map((item: ISidebarElementProps, index: number) => {
                        return (
                            <SidebarBodyItem
                                index={index}
                                item={item}
                                key={index}
                                sidebarElementsLength={sidebarItems.length}
                            />
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default SidebarBody;
