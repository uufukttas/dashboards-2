export interface IModalBodyProps {
    children: React.ReactNode;
};

export interface IModalHeaderProps {
    modalHeaderTitle: string;
    onClose?: () => void;
};

export interface IModalProps {
    children: React.ReactNode;
    className?: string;
    modalHeaderTitle: string;
    modalId: string;
    onClose?: () => void;
};