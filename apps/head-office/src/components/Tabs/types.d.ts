export interface ITabsItemProps {
    title: string | JSX.Element;
};
export interface ITabsProps {
    activeTabIndex: number;
    setActiveTabIndex: (index: number) => void;
    tabItems: ITabsItemProps[];
};