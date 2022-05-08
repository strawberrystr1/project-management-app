import { IInitialFormValues } from '../../interfaces/formInterfaces';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.mutation({
      query: (token: string) => ({
        url: `users/`,
        headers: {
          Authorization: `Bearer ${token}`,
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
