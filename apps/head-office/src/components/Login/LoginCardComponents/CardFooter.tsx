import React from 'react';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import Image from 'next/image';

const CardFooter: React.FC = () => {
    const loginPrefix: string = `${BRAND_PREFIX}-login-card-footer`;

    return (
        <div className={`${loginPrefix}-text-container flex justify-center items-center w-full`}>
            <p className={`${loginPrefix}-text italic text-center text-sm text-text px-2`}>
                Powered by
            </p>
            <Image src="/evslogo.jpg" alt='logo' width={20} height={20} />
        </div>
    );
};

export default CardFooter;
