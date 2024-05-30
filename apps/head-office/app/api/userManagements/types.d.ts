
interface IGetUsersManagementUsersProps {
    lastLoginDate: string | null;
    roleNames: string;
    userId: number;
    userName: string;
};

export interface IGetUsersManagementUsersResponseProps {
    count: number;
    data: IGetUsersManagementUsersProps[] | [];
    message: string;
    success: boolean;
};

export interface IRegisterUserRequestData {
    userName: string,
    password: string,
    newPassword: string,
    eMail: string,
    phoneNumber: string,
    roles: string[]
};
export interface ISearchedUserDataResponseProps {
    count: number;
    data: IGetUsersManagementUsersProps[] | [];
    success: boolean;
};
