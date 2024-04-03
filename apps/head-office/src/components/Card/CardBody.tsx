import { BRAND_PREFIX } from '../../constants/constants';

interface ICardBodyProps {
    children?: React.ReactNode;
};

export function CardBody({ children }: ICardBodyProps) {
    return (
        <div className={`${BRAND_PREFIX}-card-body-container`}>
            {children}
        </div>
    );
};

export default CardBody;
