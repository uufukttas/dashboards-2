import { BRAND_PREFIX } from '../../constants/constants';

const CardBody: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`${BRAND_PREFIX}-card-body-container`}>
            {children}
        </div>
    );
};

export default CardBody;
