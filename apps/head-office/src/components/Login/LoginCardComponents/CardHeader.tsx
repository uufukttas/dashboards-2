import React from 'react';
import { BRAND_PREFIX, userInfo } from '../../../constants/constants';
import { Image } from '@projects/image';

const CardHeader: React.FC = () => {
    const loginPrefix: string = `${BRAND_PREFIX}-login-card`;

    return (
        <>
            <div className={`${loginPrefix}-logo-container w-full flex justify-center items-center`}>
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
