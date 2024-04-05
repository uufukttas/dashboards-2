interface ICardContentProps {
    body: React.JSX.Element;
    header?: React.JSX.Element;
    footer?: React.JSX.Element;
};

export interface ICardProps {
    cardContent: ICardContentProps;
    className?: string;
};

export interface ICardComponentProps {
    className?: string;
    children: React.ReactNode;
};