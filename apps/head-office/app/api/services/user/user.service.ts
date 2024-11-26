import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { Post } from '../../types';
import { IGetUserResponse, IGetUsersRequestBody, IRegisterUserRequestBody, IUpdatedUserData } from './user.interface';

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
    getUser: build.mutation<IGetUserResponse, Post<{ userId: number }>>({
      query: ({ body }) => ({
        url: '/Auth/User',
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    getUsers: build.mutation<void, Post<IGetUsersRequestBody>>({
      query: ({ body }) => ({
        url: '/Auth/Users',
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
