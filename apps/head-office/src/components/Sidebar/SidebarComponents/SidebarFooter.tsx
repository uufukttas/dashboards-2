import React from 'react';
import Link from 'next/link';
import { FaDoorOpen } from 'react-icons/fa6';
import { BRAND_PREFIX } from '../../../constants/constants';

const SidebarFooter: React.FC = () => {
    const sidebarFooterPrefix: string = `${BRAND_PREFIX}-sidebar-footer`;

    return (
        <div className={`${sidebarFooterPrefix}-container flex items-center p-4`}>
            <div className={`${sidebarFooterPrefix}-icon-container`}>
                <Link href="/">
                    <FaDoorOpen />
                </Link>
            </div>
        </div>
    );
};

export default SidebarFooter;
