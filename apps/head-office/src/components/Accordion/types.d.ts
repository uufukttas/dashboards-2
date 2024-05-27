export interface IAccordionProps {
    accordionIcon?: React.ReactNode;
    accordionTitle: string | React.ReactNode;
    actionButton?: React.ReactNode;
    backgroundColor?: string;
    children: React.ReactNode;
    contentClassName?: string;
    isAccordionOpen?: boolean;
    titleClassName?: string;
};