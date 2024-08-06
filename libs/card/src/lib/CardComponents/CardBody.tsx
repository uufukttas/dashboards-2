
export interface ICardBodyProps {
    brandPrefix: string;
    cardBodyClassName?: string;
    children: React.ReactNode;
};
const CardBody: React.FC<ICardBodyProps> = ({ brandPrefix, cardBodyClassName, children }: ICardBodyProps) => {
    return (
        <div className={`${brandPrefix}-card-body-container ${cardBodyClassName}`}>
            {children}
        </div>
    );
};

export default CardBody;
