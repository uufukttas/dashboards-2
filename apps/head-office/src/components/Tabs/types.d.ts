export interface ITabsItemProps {
    title: string | JSX.Element;
};
export interface ITabsProps {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
};