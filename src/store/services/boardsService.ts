import { IBoard, ICreateBoard } from '../../interfaces/apiInterfaces';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBoards: build.query<IBoard[], void>({
      query: () => ({
        url: 'boards',
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
        body,
      }),
      invalidatesTags: [{ type: 'boards', id: 'LIST' }],
    }),
    updateBoard: build.mutation<unknown, ICreateBoard>({
      query: (body) => ({
        url: `boards/${body['_id']}`,
        method: 'PUT',
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
      }),
      invalidatesTags: [{ type: 'boards', id: 'LIST' }],
    }),
    getBoardById: build.query<IBoard, string>({
      query: (id) => ({
        url: `boards/${id}`,
      }),
    }),
    getBoard: build.mutation<IBoard, string>({
      query: (id) => ({
        url: `boards/${id}`,
      }),
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
  useGetBoardByIdQuery,
  useGetBoardMutation,
} = getApi;
