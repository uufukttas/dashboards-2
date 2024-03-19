import React from 'react';
import Link from 'next/link';
import { FaDoorOpen } from 'react-icons/fa6';
import { BRAND_PREFIX } from '../../constants/constants';

const SidebarFooter = () => {
    return (
        <div className={`${BRAND_PREFIX}-sidebar-footer-container flex items-center p-4`}>
            <div className={`${BRAND_PREFIX}-sidebar-footer-icon-container`}>
                <Link href="/">
                    <FaDoorOpen />
                </Link>
            </div>
        </div>
    );
};

export default SidebarFooter;
