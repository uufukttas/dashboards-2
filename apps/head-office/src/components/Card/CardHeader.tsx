import { BRAND_PREFIX } from '../../constants/constants';
import type { ICardHeaderProps } from './types';

const CardHeader: React.FC<ICardHeaderProps> = ({ children }: ICardHeaderProps) => {
    return (
        <div className={`${BRAND_PREFIX}-card-header-container flex items-center justify-between`}>
            {children}
        </div>
    );
};

export default CardHeader;
