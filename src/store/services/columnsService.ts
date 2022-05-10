import { IRequestBasic, IColumnResponse } from '../../interfaces/apiInterfaces';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getColumns: build.mutation<IColumnResponse[], IRequestBasic>({
      query: (body) => ({
        url: `boards/${body.id}/columns`,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
    }),
  }),
});

export const { useGetColumnsMutation } = getApi;
