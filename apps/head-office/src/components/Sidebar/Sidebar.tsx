import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';

import './Sidebar.css';
import { toggleSidebarExpanded } from '../../../app/redux/features/isSidebarExpand';
import { userInfo } from '../../constants/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SidebarComponent: React.FC = () => {
  const sidebarPrefix: string = `${BRAND_PREFIX}-sidebar`;
  const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);
  const btnRef2 = useRef(null);
  const dispatch = useDispatch();

  return (
    <div className="card flex justify-center">
      <Sidebar
        className='w-auto'
        visible={isSidebarExpanded}
        onHide={() => dispatch(toggleSidebarExpanded(isSidebarExpanded))}
        content={({ closeIconRef, hide }) => (
          <div className="min-h-screen flex relative lg:static surface-ground">
            <div
              id="app-sidebar-2"
              className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
              style={{ width: '280px' }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 pt-3">
                  <span className="inline-flex align-items-center gap-2">
                    <Image src={userInfo.logo} alt='logo' width={100} height={100} />
                    {/* <span className="font-semibold text-2xl text-primary">
                      Your Logo
                    </span> */}
                  </span>
                  <span>
                    <Button
                      type="button"
                      onClick={(e) => hide(e)}
                      icon="pi pi-times"
                      rounded
                      outlined
                      className="h-2rem w-2rem"
                    >
                    </Button>
                  </span>
                </div>
                <div className="overflow-y-auto">
                  <ul className="list-none p-3 m-0 overflow-hidden">
                    <li className="cursor-pointer p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <a href='/dashboards'>
                        <i className="pi pi-home mr-2"></i>
                        <span className="font-medium">Dashboard</span>
                      </a>
                    </li>
                    <li className="cursor-pointer p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <a href="/service-points">
                        <i className="pi pi-map-marker mr-2"></i>
                        <span className="font-medium">Istasyonlar</span>
                      </a>
                    </li>
                    <li className="cursor-pointer p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <a href='/users-management'>
                        <i className="pi pi-users mr-2"></i>
                        <span className="font-medium">Kullanici Yonetimi</span>
                      </a>
                    </li>
                    <li>
                      <StyleClass
                        nodeRef={btnRef2}
                        selector="@next"
                        enterClassName="hidden"
                        enterActiveClassName="slidedown"
                        leaveToClassName="hidden"
                        leaveActiveClassName="slideup"
                      >
                        <a
                          ref={btnRef2}
                          className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                        >
                          <i className="pi pi-chart-line mr-2"></i>
                          <span className="font-medium">Rapor Merkezi</span>
                          <i className="pi pi-chevron-down ml-auto mr-1"></i>
                          <Ripple />
                        </a>
                      </StyleClass>
                      <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                        <li className="cursor-pointer p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                          <a href="/reports/all-reports">
                            <i className="pi pi-chart-line mr-2"></i>
                            <span className="font-medium">Tum Islemler</span>
                          </a>
                        </li>
                        <li className="cursor-pointer p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                          <a href="/reports/users-reports">
                            <i className="pi pi-chart-line mr-2"></i>
                            <span className="font-medium">Kullanici Islemleri</span>
                          </a>
                        </li>
                        <li className="cursor-pointer p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                          <a href="/reports/charge-reports">
                            <i className="pi pi-chart-line mr-2"></i>
                            <span className="font-medium">Sarj Islemleri</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="cursor-pointer p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <a href="/tariffs-management">
                        <i className="pi pi-wallet mr-2"></i>
                        <span className="font-medium">Tarifeler</span>
                      </a>
                    </li>
                    <li className="cursor-pointer p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <a href="/campaigns">
                        <i className="pi pi-tags mr-2"></i>
                        <span className="font-medium">Kampanyalar</span>
                      </a>
                    </li>
                    <li className="cursor-pointer p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                      <a href="/faq">
                        <i className="pi pi-question-circle mr-2"></i>
                        <span className="font-medium">FAQ</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto">
                  <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                  <a v-ripple className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                    <span>
                      Copyright © 2024
                    </span>
                    <Image src="/evslogo.jpg" alt='logo' width={20} height={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        icons={
          <React.Fragment>
            <button className="p-sidebar-icon p-link mr-2">
              <span className="pi pi-plus" />
            </button>
          </React.Fragment>
        }
      ></Sidebar>
    </div>
  );
};

export default SidebarComponent;
