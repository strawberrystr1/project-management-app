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
export interface ICreateBoard {
  title: string;
  owner: string;
  users?: string[]; //todo change?
  _id?: string;
}
export interface IBoard {
  owner: string;
  title: string;
  users: string[]; //todo change?
  _id: string;
  columns?: IColumn[];
}
export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}
export interface ITask {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: IFile[];
}
export interface IFile {
  filename: string;
  fileSize: number;
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

export interface ITaskResponse extends IColumnResponse, IDeleteColumn {
  description: string;
  userId: string;
}

export type IGetTasks = IDeleteColumn;

export interface ICreateTask {
  paths: IGetTasks;
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
  };
}
