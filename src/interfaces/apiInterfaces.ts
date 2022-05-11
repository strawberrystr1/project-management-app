export interface IAPIError {
  status: number;
  data: {
    message: string;
    statusCode: number;
  };
}

export interface IUserResponse {
  id: string;
  login: string;
  name: string;
}

export interface IRequestBasic {
  id: string;
  token: string;
}

interface IUserData {
  name: string;
  login: string;
  password: string;
}
export interface IChangePasswordRequest extends IRequestBasic {
  body: IUserData;
}
