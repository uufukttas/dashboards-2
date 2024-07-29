
export interface ICardBodyProps {
    brandPrefix: string;
    children: React.ReactNode;
};
const CardBody: React.FC<ICardBodyProps> = ({ brandPrefix, children }: ICardBodyProps) => {
    return (
        <div className={`${brandPrefix}-card-body-container`}>
            {children}
        </div>
    );
};

export default CardBody;
