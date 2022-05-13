import {
  IChangePasswordRequest,
  IRequestBasic,
  IUserResponse,
} from '../../interfaces/apiInterfaces';
import { IInitialFormValues } from '../../interfaces/formInterfaces';
import { readToken } from '../../utils/functions';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.mutation<IUserResponse, Omit<IRequestBasic, 'token'>>({
      query: (body) => ({
        url: `users/${body.id}`,
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
    updateUser: build.mutation<IUserResponse, Omit<IChangePasswordRequest, 'token'>>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PUT',
        body: body.body,
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
    }),
    deleteUser: build.mutation<unknown, Omit<IRequestBasic, 'token'>>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${readToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useSignInMutation,
  useGetUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = getApi;
