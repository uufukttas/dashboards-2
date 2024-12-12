import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Get, Post } from '../../types';
import {
  CreateNotificationBody,
  ICancelNotificationBody,
  IEditNotificationBody,
  INoficication,
  INotificationDelivery,
  INotificationInfoColor,
  INotificationInfoType,
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
    getNotificationDeliveryList: build.query<Array<INotificationDelivery>, Get<{ notificationId: number }>>({
      query: ({ params }) => ({
        url: `${ENDPOINTS.NOTIFICATION}${ENDPOINTS.GET_NOTIFICATION_DELIVERY_LIST}`,
        method: ApiServiceMethods.GET,
        params,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    editNotification: build.mutation<void, Post<IEditNotificationBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.NOTIFICATION}${ENDPOINTS.EDIT_NOTIFICATION}`,
        method: ApiServiceMethods.POST,
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['notifications'],
    }),
    cancelNotification: build.mutation<void, Post<ICancelNotificationBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.NOTIFICATION}${ENDPOINTS.CANCEL_NOTIFICATION}`,
        method: ApiServiceMethods.POST,
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['notifications'],
    }),
    getNotificationInfoColorList: build.query<Array<INotificationInfoColor>, void>({
      query: () => ({
        url: `${ENDPOINTS.NOTIFICATION}${ENDPOINTS.GET_NOTIFICATION_INFO_COLOR_LIST}`,
        method: ApiServiceMethods.GET,
      }),
    }),
    getNotificationInfoTypeList: build.query<Array<INotificationInfoType>, void>({
      query: () => ({
        url: `${ENDPOINTS.NOTIFICATION}${ENDPOINTS.GET_NOTIFICATION_INFO_TYPE_LIST}`,
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
  useGetNotificationDeliveryListQuery,
  useLazyGetNotificationDeliveryListQuery,
  useEditNotificationMutation,
  useCancelNotificationMutation,
  useGetNotificationInfoColorListQuery,
  useGetNotificationInfoTypeListQuery,
} = notificationService;
