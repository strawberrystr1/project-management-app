/* eslint-disable prettier/prettier */
import { IBoard, ICreateBoard, IRequestBasic } from '../../interfaces/apiInterfaces';
import { api } from './basicAPItemplate';



const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBoards: build.query<IBoard[], string>({
      query: (token) => ({
        url: 'boards',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'boards' as const, id })),
            { type: 'boards', id: 'LIST' },
          ]
          : [{ type: 'boards', id: 'LIST' }],
    }),
    createBoard: build.mutation<IBoard, ICreateBoard>({
      query: (body) => ({
        url: `boards`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
        body: {
          title: body.title,
        },
      }),
      invalidatesTags: [{ type: 'boards', id: 'LIST' }],
    }),
    updateBoard: build.mutation<unknown, ICreateBoard>({
      query: (body) => ({
        url: `boards/${body.id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
        body: {
          title: body.title,
        },
      }),
      invalidatesTags: [{ type: 'boards', id: 'LIST' }],
    }),
    deleteBoard: build.mutation<unknown, IRequestBasic>({
      query: (body) => ({
        url: `boards/${body.id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
      invalidatesTags: [{ type: 'boards', id: 'LIST' }],
    }),
    getBoardById: build.query<IBoard, IRequestBasic>({
      query: (body) => ({
        url: `boards/${body.id}`,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
    }),
    // createUser: build.mutation({
    //   query: (body: IInitialFormValues) => ({
    //     url: 'signup',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // signIn: build.mutation({
    //   query: (body: Omit<IInitialFormValues, 'name'>) => ({
    //     url: 'signin',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
  }),
});

export const { useGetBoardsQuery, useCreateBoardMutation, useDeleteBoardMutation, useUpdateBoardMutation, useGetBoardByIdQuery } = getApi;
