import {
  IRequestBasic,
  IColumnResponse,
  IDeleteColumn,
  IUpdateColumn,
  ISingleColumnRequest,
} from '../../interfaces/apiInterfaces';
import { readToken } from '../../utils/functions';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getColumns: build.query<IColumnResponse[], Omit<IRequestBasic, 'token'>>({
      query: (body) => ({
        url: `boards/${body.id}/columns`,
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Columns' as const, id })),
              { type: 'Columns', id: 'LIST' },
            ]
          : [{ type: 'Columns', id: 'LIST' }],
    }),
    addColumn: build.mutation({
      query: (body: IColumnResponse) => ({
        url: `boards/${body.id}/columns`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
        body: {
          title: body.title,
          order: body.order,
        },
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    deleteColumn: build.mutation({
      query: (queries: IDeleteColumn) => ({
        url: `boards/${queries.boardId}/columns/${queries.columnId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    updateColumn: build.mutation({
      query: (data: IUpdateColumn) => ({
        url: `boards/${data.paths.boardId}/columns/${data.paths.columnId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
        body: {
          title: data.body.title,
          order: data.body.order,
        },
      }),
      invalidatesTags: [{ type: 'Columns', id: 'LIST' }],
    }),
    getColumnById: build.query<IColumnResponse, Omit<ISingleColumnRequest, 'token'>>({
      query: (data) => ({
        url: `boards/${data.id}/columns/${data.columnId}`,
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useAddColumnMutation,
  useDeleteColumnMutation,
  useUpdateColumnMutation,
  useGetColumnByIdQuery,
} = getApi;
