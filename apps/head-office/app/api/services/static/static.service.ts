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
  }),
});

export const { useGetKeyByListMutation, useGetLanaugeListQuery } = staticService;
