export interface LoginRequestBody {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: {
    id: number;
    result: string;
  };
}
