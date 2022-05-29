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

export interface ISingleColumnRequest extends IRequestBasic {
  columnId: string;
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
  users?: string[];
  _id?: string;
}
export interface IBoard {
  owner: string;
  title: string;
  users: string[];
  _id: string;
  columns: IColumn[];
}
export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: IFullTask[];
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
  files?: unknown[];
  points?: unknown[];
}
export interface IFile {
  _id: string;
  boardId: string;
  name: string;
  path: string;
  taskId: string;
}

export type IGetTasks = IDeleteColumn;

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
export interface IUpdateColumnTasks {
  columnId: string;
  tasks: IFullTask[];
}

export type ICreateTask = Omit<ITask, '_id' | 'toggleTaskOpen'>;

export type User = {
  _id: string;
  name: string;
  login: string;
};

export interface IActionTaskData {
  boardId: string;
  columnId: string;
  taskId: string;
}
export interface IFullTask extends ITask {
  files: string[];
  points: string[];
  _id: string;
}
export interface IUpdateTaskStore extends IActionTaskData {
  body: IFullTask;
}

export interface IUpdateTask extends IActionTaskData {
  body: Omit<ITask, '_id' | 'points' | 'files'>;
}

export interface IUpdateTaskFromPopup {
  description?: string;
  title?: string;
  users?: string[];
}
