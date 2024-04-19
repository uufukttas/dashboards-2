import { BRAND_PREFIX } from '../../constants/constants';

export function CardHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${BRAND_PREFIX}-card-header-container flex items-center w-full justify-between`}>
            {children}
        </div>
    );
};

export default CardHeader;
