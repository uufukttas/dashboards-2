import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { StyleClass } from 'primereact/styleclass';
import { useRouter } from 'next/navigation';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { ISidebarItemComponentProps } from '../types';
import { BiSolidEvStation } from 'react-icons/bi';

const SidebarBodyItem: React.FC<ISidebarItemComponentProps> = ({ item }) => {
    const sidebarPrefix: string = `${BRAND_PREFIX}-sidebar`;
    const expandMenuButton = useRef(null);
    const router = useRouter();

    if (item.subItems) {
        return (
            <li>
                <StyleClass
                    nodeRef={expandMenuButton}
                    enterActiveClassName="slidedown"
                    enterClassName="hidden"
                    leaveActiveClassName="slideup"
                    leaveToClassName="hidden"
                    selector="@next"
                >
                    <Button
                        className={`${sidebarPrefix}-content-list-container-list-item cursor-pointer p-ripple flex align-items-center p-3 border-round text-700 hover:surface-100 transition-duration-150 w-full`}
                        ref={expandMenuButton}
                    >
                        <i className={item.icon.toString() + " mr-2"}></i>
                        <span className="font-medium">{item.label}</span>
                        <i className="pi pi-chevron-down ml-auto mr-1"></i>
                    </Button>
                </StyleClass>
                <ul
                    className={`${sidebarPrefix}-sublist-item-container list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400`}
                >
                    {
                        item.subItems.map((subItem, subIndex) => (
                            <li
                                className={`${sidebarPrefix}-sublist-item-container-item cursor-pointer p-ripple flex align-items-center p-3 border-round text-700 hover:surface-100 w-full`}
                                key={subIndex}
                            >
                                <Button onClick={() => router.push(subItem.path)}>
                                    <i className={subItem.icon.toString() + " mr-2"}></i>
                                    <span className="font-medium">{subItem.label}</span>
                                </Button>
                            </li>
                        ))
                    }
                </ul>
            </li>
        );
    }

    return (
        <li
            className={`${sidebarPrefix}-content-list-container-list-item cursor-pointer p-ripple flex align-items-center p-3 border-round text-700 hover:surface-100 w-full`}
        >
            <Button onClick={() => router.push(item.path)}>
                {
                    item.icon === 'BiSolidEvStation'
                        ? (
                            <BiSolidEvStation className="mr-2" />
                        ) : (
                            <i className={item.icon + " mr-2"}></i>
                        )
                }
                <span className="font-medium">{item.label}</span>
            </Button>
        </li>
    );
};

export default SidebarBodyItem;
