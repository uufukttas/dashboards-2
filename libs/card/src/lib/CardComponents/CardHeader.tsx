export interface ICardHeaderProps {
    brandPrefix: string;
    children: React.ReactNode;
};

const CardHeader: React.FC<ICardHeaderProps> = ({ brandPrefix, children }: ICardHeaderProps) => {
    return (
        <div className={`${brandPrefix}-card-header-container flex items-center justify-between`}>
            {children}
        </div>
    );
};

export default CardHeader;
