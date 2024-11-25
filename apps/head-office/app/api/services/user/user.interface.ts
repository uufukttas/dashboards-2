export interface IRegisterUserRequestBody {
  name: string;
  surname: string;
  userName: string;
  password: string;
  newPassword: string;
  eMail: string;
  phoneNumber: string;
  roles: string[];
}

export interface IUpdatedUserData {
  id: number;
  name: string;
  surname: string;
  eMail: string;
  phoneNumber: string;
  roles: string[];
  userName: string;
}

export interface IGetUsersRequestBody {
  page: number;
  pageSize: number;
  name?: string;
  userName?: string;
  phoneNumber?: string;
  roles?: string;
}

export interface IGetUserResponse {
  userId: number;
  name: string;
  surname: string;
}
