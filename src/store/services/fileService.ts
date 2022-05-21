import { CreateFile, IFile } from '../../interfaces/apiInterfaces';
import { readToken } from '../../utils/functions';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
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
    }),
    getFiles: build.mutation({
      query: (body) => ({
        url: `file`,
        params: {
          ...body,
        },
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${readToken()}`,
          'Content-Type': 'application/json',
        },
      }),
    }),
    deleteFile: build.mutation({
      query: (fileId: string) => ({
        url: `file/${fileId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
    }),
  }),
});

export const { useCreateFileMutation, useGetFilesMutation, useDeleteFileMutation } = getApi;
