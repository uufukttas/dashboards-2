'use client';

interface ICardBodyProps {
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export function CardBody({ children, onClick }: ICardBodyProps) {
    return (
        <div className="sh-card-body-container" onClick={onClick}>
            {children}
        </div>
    );
};

export default CardBody;
