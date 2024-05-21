import React from 'react';
import { Image } from '@projects/image';
import { BRAND_PREFIX, userInfo } from '../../../constants/constants';

const CardHeader: React.FC = () => {
    const loginPrefix: string = `${BRAND_PREFIX}-login-card`;
    return (
        <>
            <div className={`${loginPrefix}-title-container w-full`}>
                <h2 className={`${loginPrefix}-title text-2xl font-semibold text-heading`}>
                    {userInfo.name}
                </h2>
            </div>
            <div className={`${loginPrefix}-logo-container`}>
                <Image
                    alt={`${userInfo.name} logo`}
                    className={`${loginPrefix}-logo`}
                    height={100}
                    src={userInfo.logo}
                    width={100}
                />
            </div>
        </>
    );
};

export default CardHeader;
