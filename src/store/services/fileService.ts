import { IFile } from '../../interfaces/apiInterfaces';
import { readToken } from '../../utils/functions';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFiles: build.query<IFile[], string>({
      query: (taskId) => ({
        url: `file/${taskId}`,
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Files' as const, id: _id })),
              { type: 'Files', id: 'LIST' },
            ]
          : [{ type: 'Files', id: 'LIST' }],
    }),
    createFile: build.mutation({
      query: (body) => ({
        url: 'file',
        method: 'POST',
        headers: {
          Accept: 'multipart/form-data',
          Authorization: `Bearer ${readToken()}`,
        },
        body: body,
      }),
      invalidatesTags: [{ type: 'Files', id: 'LIST' }],
    }),
    deleteFile: build.mutation({
      query: (fileId: string) => ({
        url: `file/${fileId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
      invalidatesTags: [{ type: 'Files', id: 'LIST' }],
    }),
  }),
});

export const { useCreateFileMutation, useDeleteFileMutation, useGetFilesQuery } = getApi;
