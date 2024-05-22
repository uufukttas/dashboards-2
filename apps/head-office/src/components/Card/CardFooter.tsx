import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';

const CardFooter: React.FC<{ children: React.ReactNode; className?: string; }> = ({
    children, className }: { children: React.ReactNode; className?: string; }): React.ReactNode => {
    return (
        <div className={`${BRAND_PREFIX}-card-footer-container ${className ? (className + ' mt-4') : 'mt-2'}`}>
            {children}
        </div>
    );
};

export default CardFooter;
