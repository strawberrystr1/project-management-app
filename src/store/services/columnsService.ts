import {
  IRequestBasic,
  IDeleteColumn,
  IUpdateColumn,
  IColumn,
  ICreateColumn,
} from '../../interfaces/apiInterfaces';
import { readToken } from '../../utils/functions';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getColumns: build.query<IColumn[], Omit<IRequestBasic, 'token'>>({
      query: (body) => ({
        url: `boards/${body.id}/columns`,
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
    }),
    addColumn: build.mutation({
      query: (body: ICreateColumn) => ({
        url: `boards/${body.boardId}/columns`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
        body,
      }),
    }),
    deleteColumn: build.mutation({
      query: (queries: IDeleteColumn) => ({
        url: `boards/${queries.boardId}/columns/${queries.columnId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
    }),
    updateColumn: build.mutation({
      query: ({ body, columnId }: IUpdateColumn) => ({
        url: `boards/${body.boardId}/columns/${columnId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
        body,
      }),
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useAddColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} = getApi;
