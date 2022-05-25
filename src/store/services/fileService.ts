import { IFile } from '../../interfaces/apiInterfaces';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFiles: build.query<IFile[], string>({
      query: (taskId) => ({
        url: `file/${taskId}`,
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
        },
        body: body,
      }),
      invalidatesTags: [{ type: 'Files', id: 'LIST' }],
    }),
    deleteFile: build.mutation({
      query: (fileId: string) => ({
        url: `file/${fileId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Files', id: 'LIST' }],
    }),
  }),
});

export const { useCreateFileMutation, useDeleteFileMutation, useGetFilesQuery } = getApi;
