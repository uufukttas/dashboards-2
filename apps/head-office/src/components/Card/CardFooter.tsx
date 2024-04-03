import { BRAND_PREFIX } from '../../constants/constants';

interface ICardFooterProps {
    className?: string;
    children: React.ReactNode;
};

export function CardFooter({ children, className }: ICardFooterProps) {
    return (
        <div className={`${BRAND_PREFIX}-card-footer-container ${className ? (className + ' mt-4') : 'mt-2'}`}>
            {children}
        </div>
    );
};

export default CardFooter;
