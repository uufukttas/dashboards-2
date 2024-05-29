export interface IAccordionProps {
    accordionIcon?: React.ReactNode;
    accordionTitle: string | React.ReactNode;
    actionButton?: React.ReactNode;
    backgroundColor?: string;
    children: React.ReactNode;
    contentClassName?: string;
    iconType?: 'plus-minus' | 'up-down';
    isAccordionOpen?: boolean;
    titleClassName?: string;
};