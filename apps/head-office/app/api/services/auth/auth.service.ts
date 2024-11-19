import baseApi from '../../baseApi';
import { RequestMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Post } from '../../types';
import { LoginRequestBody, LoginResponse } from './auth.interface';

const authService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Post<LoginRequestBody>>({
      query: ({body}) => ({
        url: `${ENDPOINTS.AUTH}${ENDPOINTS.LOGIN}`,
        method: RequestMethods.POST,
        body:body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled.then((response) => {
          localStorage.setItem('token', response.data.token.result);
        });
      },
    }),
  }),
});

export const { useLoginMutation } = authService;
