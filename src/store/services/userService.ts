import {
  IChangePasswordRequest,
  IRequestBasic,
  IUserResponse,
  User,
} from '../../interfaces/apiInterfaces';
import { IInitialFormValues } from '../../interfaces/formInterfaces';
import { api } from './basicAPItemplate';

const getApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.mutation<IUserResponse, string>({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
    createUser: build.mutation({
      query: (body: IInitialFormValues) => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    signIn: build.mutation({
      query: (body: Omit<IInitialFormValues, 'name'>) => ({
        url: 'auth/signin',
        method: 'POST',
        body,
      }),
    }),
    updateUser: build.mutation<IUserResponse, IChangePasswordRequest>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PUT',
        body: body.body,
      }),
    }),
    deleteUser: build.mutation<unknown, IRequestBasic>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    getUsers: build.query<User[], void>({
      query: () => ({
        url: 'users',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'boards' as const, id: _id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useSignInMutation,
  useGetUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} = getApi;
