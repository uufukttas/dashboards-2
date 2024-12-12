import React, { useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from 'primereact/button';
import { BiSolidEvStation } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { toggleLoadingVisibility } from '../../../../app/redux/features/isLoadingVisible';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { ISidebarItemComponentProps } from '../types';
import { toggleSidebarExpanded } from '../../../../app/redux/features/isSidebarExpand';

const SidebarBodyItem: React.FC<ISidebarItemComponentProps> = ({ item }) => {
  const sidebarPrefix: string = `${BRAND_PREFIX}-sidebar`;
  const dispatch = useDispatch();
  const expandMenuButton = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [subActive, setSubActive] = useState(false);

  const handleClick = (path: string) => {
    dispatch(toggleLoadingVisibility(true));
    dispatch(toggleSidebarExpanded(false));
    router.push(path);
  };

  if (item.subItems) {
    const isSubItemActive = item.subItems.some(
      (subItem) => subItem.path === pathname
    );

    return (
      <div>
        <Button
          className={`${sidebarPrefix}-content-list-container-list-item w-full flex items-center cursor-pointer p-3 rounded-md text-700 hover:bg-gray-100 transition-duration-150 ${
            isSubItemActive ? 'bg-gray-200' : ''
          }`}
          ref={expandMenuButton}
          onClick={() => {
            setSubActive(!subActive);
          }}
        >
          <i className={item.icon + ' mr-2'}></i>
          <span className="font-medium">{item.label}</span>
          <i className="pi pi-chevron-down ml-auto mr-1"></i>
        </Button>
        <ul
          className={`${sidebarPrefix}-sublist-item-container list-none py-0 pl-4 pr-0 m-0 overflow-y-hidden transition-all transition-duration-400 mt-1 ${
            subActive ? 'block' : 'hidden'
          }`}
        >
          {item.subItems.map((subItem, subIndex) => (
            <Button
              key={subIndex}
              className="w-full border-l rounded-none p-0"
              onClick={() => handleClick(subItem.path)}
            >
              <li
                className={`${sidebarPrefix}-sublist-item-container-item cursor-pointer flex items-center py-2 pl-0 rounded-md text-700 hover:bg-gray-100 w-full`}
              >
                <div className="w-6 h-4 border-l border-b -ml-1 rounded-bl-md mb-4"></div>
                <span className="font-medium pl-3 text-sm">{subItem.label}</span>
              </li>
            </Button>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Button
      className={`${sidebarPrefix}-content-list-container-list-item-container w-full flex items-center p-3 rounded-md cursor-pointer text-700 hover:bg-gray-100 `}
      onClick={() => handleClick(item.path)}
    >
      <li className={`${sidebarPrefix}-content-list-container-list-item `}>
        <div className="flex-row  flex items-center justify-center">
          {item.icon === 'BiSolidEvStation' ? (
            <BiSolidEvStation className="mr-2 " />
          ) : (
            <i className={item.icon + ' mr-2'}></i>
          )}
          <span className="font-medium">{item.label}</span>
        </div>
      </li>
    </Button>
  );
};

export default SidebarBodyItem;
