export interface IPaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (currentPage: number) => void;
};

export interface IPaginationItemProps {
    children: React.ReactNode;
    isActive: boolean;
    isDisabled: boolean;
    page: number;
    onClick: () => void;
};