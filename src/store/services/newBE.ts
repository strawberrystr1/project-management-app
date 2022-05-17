import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetAllTasks } from '../../components/BoardColumn/BoardColumn';
import { ITaskResponse } from '../../interfaces/apiInterfaces';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODBiMmNhYzc3OGI5YzE3ZmZkMTk2NCIsImxvZ2luIjoidGVzdCIsImlhdCI6MTY1MjYyMDk4MSwiZXhwIjoxNjUyNjY0MTgxfQ.pfftZgKDL8A-OEF7vuM5dKnMGEZG7amAgNWx9k5BQWQ';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const api2 = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://project-manager-by-troitskiy.herokuapp.com/' }),
  tagTypes: ['Tasks'],
  endpoints: (build) => ({
    createColumn: build.mutation({
      query: (body) => ({
        url: `/boards/${body.boardId}/columns`,
        method: 'POST',
        headers,
        body: body.body,
      }),
    }),
    getColumnsForBoard: build.query({
      query: (id: string) => ({
        url: `/boards/${id}/columns`,
        headers,
      }),
    }),
    getTasksForColumn: build.query<IGetAllTasks[], { boardId: string; columnId: string }>({
      query: (body) => ({
        url: `/boards/${body.boardId}/columns/${body.columnId}/tasks`,
        headers,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Tasks' as const, _id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    addTask: build.mutation({
      query: (body) => ({
        url: `/boards/${body.boardId}/columns/${body.columnId}/tasks`,
        method: 'POST',
        headers,
        body: body.body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateColumnMutation,
  useGetColumnsForBoardQuery,
  useGetTasksForColumnQuery,
  useAddTaskMutation,
} = api2;
