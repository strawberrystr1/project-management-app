export interface IAPIError {
  status: number;
  data: {
    message: string;
    statusCode: number;
  };
}

export interface IUserResponse {
  _id: string;
  login: string;
  name: string;
}

export interface IRequestBasic {
  id: string;
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
  columns: IColumn[];
}
export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: ITask[];
}
export interface ITask {
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: string[];
}

export interface IFile {
  filename: string;
  fileSize: number;
}

/* THIS CODE IS USED IN OLD METHODS */
export interface ITaskResponse extends IColumn, IDeleteColumn {
  description: string;
  userId: string;
}

export type IGetTasks = IDeleteColumn;

/* THIS CODE IS USED IN OLD METHODS */

export interface ICreateColumn {
  title: string;
  boardId: string;
  order: number;
}

export interface IDeleteColumn {
  boardId: string;
  columnId: string;
}

export interface IUpdateColumn {
  columnId: string;
  body: ICreateColumn;
}

export type ICreateTask = Omit<ITask, '_id'>;
