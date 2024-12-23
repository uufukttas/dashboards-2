import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Get, Post } from '../../types';
import { IFeedback, IFeedbackTypeValue } from './feedback.interface';

const feedbackService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbackList: builder.query<IFeedback, Get>({
      query: () => ({
        url: `${ENDPOINTS.FEEDBACK}${ENDPOINTS.GET_FEEDBACK_LIST}`,
        method: ApiServiceMethods.GET,
      }),
    }),
    getFeedbackById: builder.query<IFeedback, Get<{ messageId: number }>>({
      query: ({ params }) => ({
        url: `${ENDPOINTS.FEEDBACK}${ENDPOINTS.GET_FEEDBACK_BY_ID}`,
        method: ApiServiceMethods.GET,
        params,
      }),
    }),
    getFeedbackTypeList: builder.query<IFeedbackTypeValue, Get>({
      query: ({ params }) => ({
        url: `${ENDPOINTS.FEEDBACK}${ENDPOINTS.GET_FEEDBACK_TYPE_LIST}`,
        method: ApiServiceMethods.GET,
        params,
      }),
    }),
    passFeedbackRead: builder.mutation<void, Post<{ messageId: number; userId: number }>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.FEEDBACK}${ENDPOINTS.PASS_FEEDBACK_READ}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
  }),
});

export const {
  useGetFeedbackListQuery,
  useGetFeedbackByIdQuery,
  useGetFeedbackTypeListQuery,
  usePassFeedbackReadMutation,
} = feedbackService;
