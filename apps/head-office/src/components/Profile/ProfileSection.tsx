import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';

const ProfileSection: React.FC = () => {
    const profilePagePrefix: string = `${BRAND_PREFIX}-user-management`;

    return (
        <div className={`${profilePagePrefix}-table-container flex justify-between items-center flex-col`}>
            <div className={`${profilePagePrefix}-listing-container flex items-center w-full`}>

            </div>
        </div>
    );
};

export default ProfileSection;
