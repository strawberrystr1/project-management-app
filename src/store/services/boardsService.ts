/* eslint-disable prettier/prettier */
import { IBoard, ICreateBoard } from '../../interfaces/apiInterfaces';
import { readToken } from '../../utils/functions';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBoards: build.query<IBoard[], void>({
      query: () => ({
        url: 'boards',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: 'boards' as const, id: _id })),
            { type: 'boards', id: 'LIST' },
          ]
          : [{ type: 'boards', id: 'LIST' }],
    }),
    createBoard: build.mutation<IBoard, ICreateBoard>({
      query: (body) => ({
        url: `boards`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
        body,
      }),
      invalidatesTags: [{ type: 'boards', id: 'LIST' }],
    }),
    updateBoard: build.mutation<unknown, ICreateBoard>({
      query: (body) => ({
        url: `boards/${body["_id"]}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
        body: {
          title: body.title,
          owner: body.owner,
          users: body.users,
        },
      }),
      invalidatesTags: [{ type: 'boards', id: 'LIST' }],
    }),
    deleteBoard: build.mutation<unknown, string>({
      query: (id) => ({
        url: `boards/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
      invalidatesTags: [{ type: 'boards', id: 'LIST' }],
    }),
    getBoardById: build.query<IBoard, string>({
      query: (id) => ({
        url: `boards/${id}`,
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
    }),
    getBoard: build.mutation<IBoard, string>({
      query: (id) => ({
        url: `boards/${id}`,
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
    }),
  }),
});

export const { useGetBoardsQuery, useCreateBoardMutation, useDeleteBoardMutation, useUpdateBoardMutation, useGetBoardByIdQuery, useGetBoardMutation } = getApi;
