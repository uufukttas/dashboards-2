import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { StyleClass } from 'primereact/styleclass';
import { BiSolidEvStation } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { toggleLoadingVisibility } from '../../../../app/redux/features/isLoadingVisible';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { ISidebarItemComponentProps } from '../types';

const SidebarBodyItem: React.FC<ISidebarItemComponentProps> = ({ item }) => {
    const sidebarPrefix: string = `${BRAND_PREFIX}-sidebar`;
    const dispatct = useDispatch();
    const expandMenuButton = useRef(null);
    const router = useRouter();

    if (item.subItems) {
        return (
            <Button
                className={`${sidebarPrefix}-content-list-container-list-item w-full flex items-center cursor-pointer p-3 rounded-md text-700 hover:bg-gray-100 transition-duration-150`}
                ref={expandMenuButton}
            >
                <li>
                    <StyleClass
                        enterActiveClassName="slidedown"
                        enterClassName="hidden"
                        leaveActiveClassName="slideup"
                        leaveToClassName="hidden"
                        nodeRef={expandMenuButton}
                        selector="@next"
                    >
                        <i className={item.icon.toString() + " mr-2"}></i>
                        <span className="font-medium">{item.label}</span>
                        <i className="pi pi-chevron-down ml-auto mr-1"></i>
                    </StyleClass>
                    <ul
                        className={`${sidebarPrefix}-sublist-item-container list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400`}
                    >
                        {
                            item.subItems.map((subItem, subIndex) => (
                                <Button
                                    key={subIndex}
                                    onClick={() => {
                                        dispatct(toggleLoadingVisibility(true));
                                        router.push(subItem.path)
                                    }}
                                >
                                    <li
                                        className={`${sidebarPrefix}-sublist-item-container-item cursor-pointer flex items-center p-3 rounded-md text-700 hover:bg-gray-100 w-full`}
                                    >
                                        <i className={subItem.icon.toString() + " mr-2"}></i>
                                        <span className="font-medium">{subItem.label}</span>
                                    </li>
                                </Button>
                            ))
                        }
                    </ul>
                </li>
            </Button>
        );
    }

    return (
        <Button
            className={`${sidebarPrefix}-content-list-container-list-item-container w-full flex items-center p-3 rounded-md cursor-pointer text-700 hover:bg-gray-100 `}
            onClick={() => {
                dispatct(toggleLoadingVisibility(true));
                router.push(item.path)
            }}
        >
            <li className={`${sidebarPrefix}-content-list-container-list-item`}>
                {
                    item.icon === 'BiSolidEvStation'
                        ? (
                            <BiSolidEvStation className="mr-2" />
                        ) : (
                            <i className={item.icon + " mr-2"}></i>
                        )
                }
                <span className="font-medium">{item.label}</span>
            </li>
        </Button>
    );
};

export default SidebarBodyItem;
