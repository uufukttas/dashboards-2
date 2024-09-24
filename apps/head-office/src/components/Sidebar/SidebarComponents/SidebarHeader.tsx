import React from 'react';
import Image from 'next/image';
import { Button } from 'primereact/button';
import { BRAND_PREFIX, userInfo } from '../../../constants/constants';

const SidebarHeader: React.FC<{ hide: (event: React.MouseEvent<HTMLButtonElement>) => void }> = ({ hide }) => {
    const sidebarHeaderPrefix: string = `${BRAND_PREFIX}-sidebar-header`;

    return (
        <div className={`${sidebarHeaderPrefix}-sidebar-header-container flex items-center justify-between px-4 pt-3`}>
            <span className={`${sidebarHeaderPrefix}-sidebar-logo-container inline-flex align-items-center gap-2`}>
                <Image alt='logo' height={100} src={userInfo.logo} width={100} />
            </span>
            <span className={`${sidebarHeaderPrefix}-sidebar-close-button-container`}>
                <Button
                    className={`${sidebarHeaderPrefix}-sidebar-close-button h-2rem w-2rem`}
                    icon="pi pi-times"
                    outlined
                    rounded
                    type="button"
                    onClick={(e) => hide(e)}
                >
                </Button>
            </span>
        </div>
    );
};

export default SidebarHeader;
