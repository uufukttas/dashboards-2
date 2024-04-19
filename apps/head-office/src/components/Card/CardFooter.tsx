import { BRAND_PREFIX } from '../../constants/constants';

const CardFooter = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={`${BRAND_PREFIX}-card-footer-container ${className ? (className + ' mt-4') : 'mt-2'}`}>
            {children}
        </div>
    );
};

export default CardFooter;
