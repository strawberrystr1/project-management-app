import {
  IChangePasswordRequest,
  IRequestBasic,
  IUserResponse,
} from '../../interfaces/apiInterfaces';
import { IInitialFormValues } from '../../interfaces/formInterfaces';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.mutation<IUserResponse, IRequestBasic>({
      query: (body) => ({
        url: `users/${body.id}`,
        headers: {
          Authorization: `Bearer ${body.token}`,
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
    updateUser: build.mutation<IUserResponse, IChangePasswordRequest>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PUT',
        body: body.body,
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      }),
    }),
    deleteUser: build.mutation<unknown, IRequestBasic>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${body.token}`,
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
