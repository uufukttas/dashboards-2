export interface ISidebarBodyItemProps {
    index: number;
    item: ISidebarElementProps;
    sidebarElementsLength: number;
};
export interface ISidebarElementProps {
    icon: string | JSX.Element;
    label: string;
    path: string;
    subItems?: ISidebarElementProps[];
};
export interface ISidebarHeaderProps {
    hide: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface ISidebarItemComponentProps {
    item: ISidebarElementProps;
};
