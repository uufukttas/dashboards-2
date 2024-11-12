import React from 'react';
import Link from 'next/link';
import { FaDoorOpen } from 'react-icons/fa6';
import { BRAND_PREFIX } from '../../../constants/constants';
import Image from 'next/image';

const SidebarFooter: React.FC = () => {
    const sidebarFooterPrefix: string = `${BRAND_PREFIX}-sidebar-footer`;

    return (
        <div className={`${sidebarFooterPrefix}-sidebar-footer-container mt-auto flex items-center justify-between`}>
            <p className="m-3 flex align-items-center justify-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                <span>
                    © 2024
                </span>
                <Image src="/evslogo.jpg" alt='logo' width={30} height={30} className='object-cover' />
            </p>
            <Link href='/' onClick={() => { localStorage.setItem('token', '') }}>
                <FaDoorOpen className='mx-8 text-2xl' />
            </Link>
        </div>
    );
};

export default SidebarFooter;
