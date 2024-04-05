import { BRAND_PREFIX } from '../../constants/constants';
import type { ICardComponentProps } from './types';

export function CardFooter({ children, className }: ICardComponentProps) {
    return (
        <div className={`${BRAND_PREFIX}-card-footer-container ${className ? (className + ' mt-4') : 'mt-2'}`}>
            {children}
        </div>
    );
};

export default CardFooter;
