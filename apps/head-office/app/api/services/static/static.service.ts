import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Post } from '../../types';
import { City, District, ResourceKey, ResourceTextRequestBody } from './static.interface';

const staticService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getKeyByList: builder.mutation<Array<ResourceKey>, Post<ResourceTextRequestBody>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.RESOURCE_TEXT}${ENDPOINTS.GET_BY_KEY_LIST}`,
      }),
    }),
    getLanaugeList: builder.query({
      query: () => ({
        method: ApiServiceMethods.GET,
        url: ENDPOINTS.LANGUAGE_LIST,
      }),
    }),
    updatedKeyList: builder.mutation<void, Post<Array<ResourceKey>>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.RESOURCE_TEXT}${ENDPOINTS.UPDATE_MULTIPLE}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    getCities: builder.query<Array<City>, void>({
      query: () => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.VALUES}${ENDPOINTS.GET_CITIES}`,
      }),
    }),
    getDistricts: builder.mutation<Array<District>, Post<{ plateNumber: number }>>({
      query: ({ body }) => ({
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.VALUES}${ENDPOINTS.GET_DISTRICTS}`,
        body,
      }),
    }),
  }),
});

export const { useGetKeyByListMutation, useGetLanaugeListQuery, useUpdatedKeyListMutation, useGetCitiesQuery, useGetDistrictsMutation } = staticService;
