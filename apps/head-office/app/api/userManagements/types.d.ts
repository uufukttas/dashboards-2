
interface IGetUsersManagementUsersProps {
    lastLoginDate: string | null;
    roleNames: string;
    userId: number;
    userName: string;
};

export interface IGetUsersManagementUsersResponseProps {
    data: IGetUsersManagementUsersProps[] | [];
    message: string;
    success: boolean;
};

export interface ISearchedUserDataResponseProps {
    data: IGetUsersManagementUsersProps[] | [];
    success: boolean;
};