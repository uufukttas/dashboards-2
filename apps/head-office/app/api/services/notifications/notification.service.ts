import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Post } from '../../types';
import { CreateNotificationBody, INotificationPushCategory, INotificationTypeList } from './notification.interface';

const notificationService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<void, void>({
      query: () => ({
        url: `${ENDPOINTS.NOTIFICATION}${ENDPOINTS.GET_NOTIFICATION_LIST}`,
        method: ApiServiceMethods.GET,
      }),
      providesTags: ['notifications'],
    }),
    addNotification: build.mutation<void, Post<CreateNotificationBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.NOTIFICATION}${ENDPOINTS.ADD_NOTIFICATION}`,
        method: ApiServiceMethods.POST,
        body,
      }),
      invalidatesTags: ['notifications'],
    }),
    getNotificationTypes: build.query<Array<INotificationTypeList>, void>({
      query: () => ({
        url: `${ENDPOINTS.NOTIFICATION}${ENDPOINTS.GET_NOTIFICATION_TYPES}`,
        method: ApiServiceMethods.GET,
      }),
    }),
    getNotificationPushCategories: build.query<Array<INotificationPushCategory>, void>({
      query: () => ({
        url: `${ENDPOINTS.NOTIFICATION}${ENDPOINTS.GET_NOTIFICATION_PUSH_CATEGORIES}`,
        method: ApiServiceMethods.GET,
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useAddNotificationMutation,
  useGetNotificationTypesQuery,
  useGetNotificationPushCategoriesQuery,
} = notificationService;
