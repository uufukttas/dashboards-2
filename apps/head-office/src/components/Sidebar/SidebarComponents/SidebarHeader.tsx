import React from 'react';
import Link from 'next/link';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { detectDevice } from '@projects/common';
import { Image } from '@projects/image';
import { BRAND_PREFIX } from '../../../constants/constants';
import { userInfo } from '../../../constants/constants';
import { toggleSidebarExpanded } from '../../../../app/redux/features/isSidebarExpand';
import { RootState } from '../../../../app/redux/store';

const SidebarHeader = () => {
    const dispatch = useDispatch();
    const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);

    const handleSidebarClose = () => dispatch(toggleSidebarExpanded(isSidebarExpanded));

    return (
        <div className={`${BRAND_PREFIX}-sidebar-header-container flex items-center justify-between h-[80px]`}>
            <div className={`${BRAND_PREFIX}-sidebar-header-logo-container`}>
                <Link href="/dashboards">
                    <Image
                        alt={userInfo.name}
                        className={`${BRAND_PREFIX}-sidebar-header-logo`}
                        src={userInfo.logo}
                    />
                </Link>
            </div>
            {
                detectDevice().isMobile === true && (
                    <div className={`${BRAND_PREFIX}-sidebar-header-close-container mx-4`}>
                        <Button
                            className={`${BRAND_PREFIX}-sidebar-header-close-button`}
                            id={`${BRAND_PREFIX}-sidebar-header-close-button`}
                            type="button"
                            onClick={handleSidebarClose}
                        >
                            <FaRegCircleXmark />
                        </Button>
                    </div>
                )
            }
        </div>
    );
};

export default SidebarHeader;
