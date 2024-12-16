import React from 'react';
import { Image } from '@projects/image';
import { BRAND_PREFIX, userInfo } from '../../../constants/constants';

const CardHeader: React.FC = () => {
    const loginPrefix: string = `${BRAND_PREFIX}-login-card`;

    return (
        <>
            <div className={`${loginPrefix}-logo-container flex justify-center items-center w-full`}>
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
