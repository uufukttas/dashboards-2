import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import type { ICardFooterProps } from './types';

const CardFooter: React.FC<ICardFooterProps> = ({ children, className }: ICardFooterProps) => {
    return (
        <div className={`${BRAND_PREFIX}-card-footer-container ${className ? (className + ' mt-4') : 'mt-2'}`}>
            {children}
        </div>
    );
};

export default CardFooter;
