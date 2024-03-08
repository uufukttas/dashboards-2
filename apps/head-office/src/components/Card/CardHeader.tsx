'use client';

import { BRAND_PREFIX } from '../../constants/constants';

interface ICardHeaderProps {
    children: React.ReactNode;
};

export function CardHeader({ children }: ICardHeaderProps) {
    return (
        <div className={`${BRAND_PREFIX}-card-header-container flex items-center w-full justify-between`}>
            {children}
        </div>
    );
};

export default CardHeader;
