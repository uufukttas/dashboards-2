import React from 'react';
import { FaDoorOpen  } from 'react-icons/fa6';
import { BRAND_PREFIX } from '../../constants/constants';

const SidebarFooter = () => {
    return (
        <div
            className={`${BRAND_PREFIX}-sidebar-footer-container flex items-center p-4`}
        >
            <div className={`${BRAND_PREFIX}-sidebar-footer-icon-container`}>
                <FaDoorOpen  />
            </div>
        </div>
    );
};

export default SidebarFooter;
