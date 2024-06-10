import { BRAND_PREFIX } from '../../constants/constants';
import type { ICardBodyProps } from './types';

const CardBody: React.FC<ICardBodyProps> = ({ children }: ICardBodyProps) => {
    return (
        <div className={`${BRAND_PREFIX}-card-body-container`}>
            {children}
        </div>
    );
};

export default CardBody;
