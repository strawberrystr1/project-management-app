import { IRequestBasic, IUserResponse } from '../../interfaces/apiInterfaces';
import { IInitialFormValues } from '../../interfaces/formInterfaces';
import { readToken } from '../../utils/functions';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.mutation<IUserResponse, string>({
      query: (id) => ({
        url: `users/${id}`,
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
    }),
    createUser: build.mutation({
      query: (body: IInitialFormValues) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    signIn: build.mutation({
      query: (body: Omit<IInitialFormValues, 'name'>) => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useSignInMutation, useGetUserMutation } = getApi;
