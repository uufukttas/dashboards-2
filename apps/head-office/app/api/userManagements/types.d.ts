
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
export interface IGetUsersRequestPayloadProps {
    name?: string;
    phoneNumber?: string;
    userName?: string;
    roles?: string;
    pageNumber?: number;
    userCount?: number;
};

export interface IRegisterUserRequestData {
    name: string;
    surname: string;
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

export interface IUpdatedUserData {
    id: number;
    name: strin;
    surname: string;
    eMail: string
    phoneNumber: string;
    roles: string[];
    userName: string;
};
