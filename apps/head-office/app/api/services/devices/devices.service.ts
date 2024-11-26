import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Post } from '../../types';
import { IDeviceResponsesProps } from './devices.interface';

const deviceServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConnectorInfo: builder.mutation<IDeviceResponsesProps[], Post<{ brandId: number }>>({
      query: ({ body }) => ({
        body: body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.VALUES}${ENDPOINTS.GET_CONNECTOR_MODELS}`,
      }),
    }),
    getDeviceBrands: builder.query<IDeviceResponsesProps[], null>({
      query: () => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.VALUES}${ENDPOINTS.GET_BRANDS}`,
      }),
    }),
    getDeviceModels: builder.query<IDeviceResponsesProps[], number>({
      query: (brandId) => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.VALUES}${ENDPOINTS.GET_MODELS}?brandId=${brandId}`,
      }),
    }),
  }),
});

export const { useGetConnectorInfoMutation, useGetDeviceBrandsQuery, useGetDeviceModelsQuery } = deviceServices;
