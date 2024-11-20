import { ResourceKey, ResourceTextRequestBody } from './static.interface';
import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Post } from '../../types';

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
  }),
});

export const { useGetKeyByListMutation, useGetLanaugeListQuery, useUpdatedKeyListMutation } = staticService;
