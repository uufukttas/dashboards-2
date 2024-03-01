'use client';

interface ICardHeaderProps {
    children: React.ReactNode;
};

export function CardHeader({ children }: ICardHeaderProps) {
    return (
        <div className={`sh-card-header-container flex items-center w-full justify-between`}>
            {children}
        </div>
    );
};

export default CardHeader;
