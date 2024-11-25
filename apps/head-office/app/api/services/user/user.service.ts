import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { Post } from '../../types';
import { IGetUsersRequestBody, IRegisterUserRequestBody, IUpdatedUserData } from './user.interface';

const userService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<void, Post<IRegisterUserRequestBody>>({
      query: ({ body }) => ({
        url: '/Auth/Register',
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    updateUser: build.mutation<void, Post<IUpdatedUserData>>({
      query: ({ body }) => ({
        url: '/Auth/UpdateUser',
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    deleteUser: build.mutation<void, Post<{ userId: number }>>({
      query: ({ body }) => ({
        url: '/Auth/ChargePointUserDelete',
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    getUser: build.mutation<void, Post<{ userId: number }>>({
      query: ({ body }) => ({
        url: '/Auth/GetUser',
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    getUsers: build.mutation<void, Post<IGetUsersRequestBody>>({
      query: ({ body }) => ({
        url: '/Auth/GetUsers',
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserMutation,
  useGetUsersMutation,
} = userService;
