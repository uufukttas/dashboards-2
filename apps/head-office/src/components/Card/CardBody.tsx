'use client';

import { BRAND_PREFIX } from '../../constants/constants';

interface ICardBodyProps {
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export function CardBody({ children, onClick }: ICardBodyProps) {
    return (
        <div className={`${BRAND_PREFIX}-card-body-container`} onClick={onClick}>
            {children}
        </div>
    );
};

export default CardBody;
