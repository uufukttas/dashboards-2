import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Get, Post } from '../../types';
import {
  ComponentValue,
  DashboardComponentInfoRequest,
  DashboardItem,
  DashboardItemDataRequest,
} from './dashboard.interface';

const dashboardService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardComponentInfo: builder.query<Array<DashboardItem>, Get<DashboardComponentInfoRequest>>({
      query: ({ params }) => ({
        url: `${ENDPOINTS.DASHBOARD}${ENDPOINTS.GET_DASHBOARD_ITEMS}`,
        method: ApiServiceMethods.GET,
        params
      }),
    }),
    getDashboardItems: builder.mutation<Array<DashboardItem>, Post<DashboardItemDataRequest>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.DASHBOARD}${ENDPOINTS.GET_DASHBOARD_ITEM_DATA}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    getComponentContent: builder.mutation<ComponentValue, Post<DashboardItemDataRequest>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.DASHBOARD}${ENDPOINTS.GET_DASHBOARD_ITEM_DATA}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
  }),
});

export const { useGetDashboardComponentInfoQuery, useGetDashboardItemsMutation, useGetComponentContentMutation } =
  dashboardService;
