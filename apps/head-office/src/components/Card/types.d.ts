export interface ICardBodyProps {
    children: React.ReactNode;
};
export interface ICardFooterProps {
    children: React.ReactNode;
    className?: string;
};
export interface ICardHeaderProps {
    children: React.ReactNode;
};
export interface ICardProps {
    cardBody: React.JSX.Element;
    cardHeader?: React.JSX.Element;
    cardFooter?: React.JSX.Element;
    className?: string;
};