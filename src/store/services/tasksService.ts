import {
  ITask,
  IGetTasks,
  ICreateTask,
  IActionTaskData,
  IUpdateTask,
} from '../../interfaces/apiInterfaces';
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
    deleteTask: build.mutation({
      query: (body: IActionTaskData) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}/tasks/${body.taskId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
    }),
    updateTask: build.mutation({
      query: (body: IUpdateTask) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}/tasks/${body.taskId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
        body: body.body,
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = getApi;
