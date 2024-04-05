import { BRAND_PREFIX } from '../../constants/constants';
import type { ICardComponentProps } from './types';

export function CardHeader({ children }: ICardComponentProps) {
    return (
        <div className={`${BRAND_PREFIX}-card-header-container flex items-center w-full justify-between`}>
            {children}
        </div>
    );
};

export default CardHeader;
