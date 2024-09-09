import React from 'react';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const LoginInfoSection: React.FC = () => {
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
    const lastLoginPrefix: string = `${profilePagePrefix}-last-login`;

    return (
        <div className={`${lastLoginPrefix}-container flex justify-between flex-col`}>
            <p className={`${lastLoginPrefix}-text text-heading`}>Son Giris: 01.01.2021</p>
            <p className={`${lastLoginPrefix}-text text-heading`}>Son Giris: 01.12.2020</p>
            <p className={`${lastLoginPrefix}-text text-heading`}>Son Giris: 01.10.2020</p>
            <p className={`${lastLoginPrefix}-text text-heading`}>Son Giris: 09.09.2020</p>
            <p className={`${lastLoginPrefix}-text text-heading`}>Son Giris: 01.09.2020</p>

        </div>
    );
};

export default LoginInfoSection;
