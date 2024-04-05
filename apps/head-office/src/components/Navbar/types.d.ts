export interface INavbarItemProps {
    title: string | JSX.Element;
};

export interface INavbarProps {
    activeIndex: number;
    items: INavbarItemProps[];
    setActiveIndex: (index: number) => void;
};