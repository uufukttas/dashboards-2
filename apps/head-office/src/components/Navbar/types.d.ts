export interface INavbarItemProps {
    title: string | JSX.Element;
};

export interface INavbarProps {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
};