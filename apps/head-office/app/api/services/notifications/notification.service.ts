import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Get, Post } from '../../types';
import {
  CreateNotificationBody,
  INoficication,
  INotificationPushCategory,
  INotificationTypeList,
} from './notification.interface';

const notificationService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Array<INoficication>, Get>({
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
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
