export interface LoginRequestBody {
  userName: string;
  password: string;
};
export interface LoginResponse {
  data: {
    token: {
      id: number;
      result: string;
    };
  };
};
