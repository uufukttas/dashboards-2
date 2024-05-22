import { BRAND_PREFIX } from '../../constants/constants';

const CardHeader: React.FC<{ children: React.ReactNode }> = ({
    children }: { children: React.ReactNode }): React.ReactNode => {
    return (
        <div className={`${BRAND_PREFIX}-card-header-container flex items-center justify-between`}>
            {children}
        </div>
    );
};

export default CardHeader;
