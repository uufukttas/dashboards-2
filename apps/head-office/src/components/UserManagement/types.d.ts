export interface IPayloadProps {
    name?: string;
    phoneNumber?: string;
    userName?: string;
    roles?: string;
    pageNumber?: number;
    userCount?: number;
};
export interface IRolesStyleProps {
    [key: string]: ITableDataAttributeProps
};
export interface IUserDataProps {
    name?: string;
    surName?: string;
    userId: number;
    userName: string;
    roleNames: string;
    lastLoginDate: string | null;
};
export interface IUserRoleProps {
    id: number;
    isChecked: boolean;
    name: string;
    rid: null,
    stationFeatureType: number,
    stationFeatureValue: number,
};
