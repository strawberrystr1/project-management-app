import {
  ITask,
  IGetTasks,
  ICreateTask,
  IActionTaskData,
  IUpdateTask,
} from '../../interfaces/apiInterfaces';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<ITask[], IGetTasks>({
      query: (paths) => ({
        url: `boards/${paths.boardId}/columns/${paths.columnId}/tasks`,
      }),
    }),
    addTask: build.mutation({
      query: (body: ICreateTask) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}/tasks`,
        method: 'POST',
        body,
      }),
    }),
    deleteTask: build.mutation({
      query: (body: IActionTaskData) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}/tasks/${body.taskId}`,
        method: 'DELETE',
      }),
    }),
    updateTask: build.mutation({
      query: (body: IUpdateTask) => ({
        url: `boards/${body.boardId}/columns/${body.columnId}/tasks/${body.taskId}`,
        method: 'PUT',
        body: body.body,
      }),
    }),
    setTasks: build.mutation({
      query: (body: ITask[]) => ({
        url: `tasksSet`,
        method: 'PATCH',
        body: {
          tasks: body,
        },
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useSetTasksMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = getApi;
