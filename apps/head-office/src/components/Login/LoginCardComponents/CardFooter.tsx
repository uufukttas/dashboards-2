import React from 'react';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const CardFooter: React.FC = () => {
    const loginPrefix: string = `${BRAND_PREFIX}-login-card-footer`;

    return (
        <div className={`${loginPrefix}-text-container flex justify-center items-center`}>
            <p className={`${loginPrefix}-text italic text-center text-sm text-text`}>Powered by EVS</p>
        </div>
    );
};

export default CardFooter;
