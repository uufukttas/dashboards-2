export interface IUserDataProps {
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