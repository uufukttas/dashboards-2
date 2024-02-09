'use client';

interface CardHeaderProps {
    children: React.ReactNode;
};

export function CardHeader({
    children,
}: CardHeaderProps) {
    return (
        <div className="sh-card-header-container flex items-center w-full justify-between">
            {children}
        </div>
    );
};

export default CardHeader;
