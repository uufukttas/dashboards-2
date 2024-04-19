import React from 'react';
import { Image } from '@projects/image';
import { BRAND_PREFIX } from '../../../constants/constants';
import { userInfo } from '../../../constants/constants';

const CardHeader = () => {
    return (
        <>
            <div className={`${BRAND_PREFIX}-card-header-container`}>
                <div className={`${BRAND_PREFIX}-card-title-container`}>
                    <h2 className={`${BRAND_PREFIX}-card-title text-2xl font-semibold text-heading`}>
                        {userInfo.name}
                    </h2>
                </div>
            </div>
            <div className={`${BRAND_PREFIX}-card-logo-container`}>
                <Image
                    alt={`${userInfo.name} logo`}
                    className={`${BRAND_PREFIX}-card-logo`}
                    height={100}
                    src={userInfo.logo}
                    width={100}
                />
            </div>
        </>
    );
};

export default CardHeader;
