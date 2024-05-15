import React from 'react';
import Link from 'next/link';
import { FaRegCircleXmark } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { detectDevice } from '@projects/common';
import { Image } from '@projects/image';
import { BRAND_PREFIX, userInfo } from '../../../constants/constants';
import { toggleSidebarExpanded } from '../../../../app/redux/features/isSidebarExpand';
import { RootState } from '../../../../app/redux/store';

const SidebarHeader: React.FC = () => {
    const sidebarHeaderPrefix = `${BRAND_PREFIX}-sidebar-header`;
    const dispatch = useDispatch();
    const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);

    return (
        <div className={`${sidebarHeaderPrefix}-container flex items-center justify-between h-[80px]`}>
            <div className={`${sidebarHeaderPrefix}-logo-container`}>
                <Link href="/dashboards">
                    <Image
                        alt={userInfo.name}
                        className={`${sidebarHeaderPrefix}-logo`}
                        src={userInfo.logo}
                    />
                </Link>
            </div>
            {
                detectDevice().isMobile === true && (
                    <div className={`${sidebarHeaderPrefix}-close-container mx-4`}>
                        <Button
                            className={`${sidebarHeaderPrefix}-close-button`}
                            id={`${sidebarHeaderPrefix}-close-button`}
                            type="button"
                            onClick={() => dispatch(toggleSidebarExpanded(isSidebarExpanded))}
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
