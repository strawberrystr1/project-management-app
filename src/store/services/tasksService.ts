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
      query: ({ paths, body }: ICreateTask) => ({
        url: `boards/${paths.boardId}/columns/${paths.columnId}/tasks`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
        body: {
          title: body.title,
          order: body.order,
          description: body.description,
          userId: body.userId,
        },
      }),
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation } = getApi;
