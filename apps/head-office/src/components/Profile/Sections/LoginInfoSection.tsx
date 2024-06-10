import React from 'react';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const LoginInfoSection: React.FC = () => {
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
    const lastLoginPrefix: string = `${profilePagePrefix}-last-login`;

    return (
        <div className={`${lastLoginPrefix}-container flex justify-between items-center`}>
            <p className={`${lastLoginPrefix}-text text-heading`}>Son Giris: 01.01.2021</p>
        </div>
    );
};

export default LoginInfoSection;
