import React from 'react';
import { CloseIcon } from '@projects/icons';
import { BRAND_PREFIX } from '../../constants/constants';

const SidebarFooter = () => {
    return (
        <div
            className={`${BRAND_PREFIX}-sidebar-footer-container flex items-center justify-center`}
        >
            <div className={`${BRAND_PREFIX}-sidebar-footer-icon-container`}>
                <CloseIcon />
            </div>
        </div>
    );
};

export default SidebarFooter;
