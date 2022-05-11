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

export interface IColumnResponse {
  id: string;
  order: number;
  title: string;
}

export interface IDeleteColumn {
  boardId: string;
  columnId: string;
}

export interface IUpdateColumn {
  paths: IDeleteColumn;
  body: Omit<IColumnResponse, 'id'>;
}
