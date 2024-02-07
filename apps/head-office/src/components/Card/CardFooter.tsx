'use client';
interface CardFooterProps {
    className?: string;
    children: React.ReactNode;
}

export function CardFooter({
    children,
    className
}: CardFooterProps) {
    return (
        <>
            <div className={`sh-card-footer-container ${className ? (className + ' mt-4') : 'mt-2'}`}>
                {children}
            </div>
        </>
    );
}

export default CardFooter;
