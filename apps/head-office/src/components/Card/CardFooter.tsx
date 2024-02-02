'use client';
interface CardFooterProps {
    children: React.ReactNode;
 }

export function CardFooter({
    children
}: CardFooterProps) {
    return (
        <>
            <div className="sh-card-footer-container mt-4">
                {children}
            </div>
        </>
    );
}

export default CardFooter;
