export interface ICardFooterProps {
    brandPrefix: string;
    children: React.ReactNode;
    className?: string;
};

const CardFooter: React.FC<ICardFooterProps> = ({ brandPrefix, children, className }: ICardFooterProps) => {
    return (
        <div className={`${brandPrefix}-card-footer-container ${className ? (className + ' mt-4') : 'mt-2'}`}>
            {children}
        </div>
    );
};

export default CardFooter;
