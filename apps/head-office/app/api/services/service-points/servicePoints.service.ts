import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Post } from '../../types';
import {
  IDeleteServicePointRequestBody,
  IGetAllServicePointsRequestBody,
  ServicePoint,
} from './servicePoints.interface';

const servicePointService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getServicePoints: build.mutation<Array<ServicePoint>, Post<IGetAllServicePointsRequestBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.GET_ALL_POINTS}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    deleteServicePoint: build.mutation<void, Post<IDeleteServicePointRequestBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.DELETE_STATION}`,
        method: ApiServiceMethods.POST,
        body: {
          id: body,
        },
      }),
    }),
  }),
});

export const { useGetServicePointsMutation, useDeleteServicePointMutation } = servicePointService;
