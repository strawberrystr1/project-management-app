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

export interface ICreateBoard {
  token: string;
  title: string;
  id?: string;
}
export interface IBoard {
  id: string;
  title: string;
  columns?: IColumn[];
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  done: boolean;
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
