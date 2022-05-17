import { ITask, IGetTasks, ICreateTask } from '../../interfaces/apiInterfaces';
import { readToken } from '../../utils/functions';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<ITask[], IGetTasks>({
      query: (paths) => ({
        url: `boards/${paths.boardId}/columns/${paths.columnId}/tasks`,
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
    }),
    addTask: build.mutation({
      query: (body: ICreateTask) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}/tasks`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
        body,
      }),
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = getApi;
