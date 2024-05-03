import React from 'react';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const CardFooter: React.FC = () => {
    return (
        <div className={`${BRAND_PREFIX}-card-footer-text-container`}>
            <p className={`${BRAND_PREFIX}-card-footer-text italic text-center text-sm text-text`}>Powered by EVS</p>
        </div>
    );
};

export default CardFooter;
