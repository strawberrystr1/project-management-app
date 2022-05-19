import { CreateFile } from '../../interfaces/apiInterfaces';
import { readToken } from '../../utils/functions';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    createFile: build.mutation({
      query: (body: CreateFile) => ({
        url: 'file',
        method: 'POST',
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': '',
          Authorization: `Bearer ${readToken()}`,
        },
        body,
      }),
    }),
  }),
});

export const { useCreateFileMutation } = getApi;
