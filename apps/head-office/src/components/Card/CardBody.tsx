import { BRAND_PREFIX } from '../../constants/constants';
import type { ICardComponentProps } from './types';

export function CardBody({ children }: ICardComponentProps) {
    return (
        <div className={`${BRAND_PREFIX}-card-body-container`}>
            {children}
        </div>
    );
};

export default CardBody;
