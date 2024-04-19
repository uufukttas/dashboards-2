import { BRAND_PREFIX } from '../../constants/constants';

export function CardBody({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${BRAND_PREFIX}-card-body-container`}>
            {children}
        </div>
    );
};

export default CardBody;
