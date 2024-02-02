'use client';

interface CardBodyProps {
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function CardBody({
    children,
    onClick,
}: CardBodyProps) {
    return (
        <>
            <div className="sh-card-body-container">
                {children}
            </div>
        </>
    );
}

export default CardBody;
