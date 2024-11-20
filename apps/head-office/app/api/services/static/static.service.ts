import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Post } from '../../types';
import { ReourceKey, ResourceTextRequestBody } from './static.interface';

const staticService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLanaugeList: builder.query({
      query: () => ({
        url: ENDPOINTS.LANGUAGE_LIST,
        method: ApiServiceMethods.GET,
      }),
    }),
    getKeyByList: builder.mutation<Array<ReourceKey>, Post<ResourceTextRequestBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.RESOURCE_TEXT}${ENDPOINTS.GET_BY_KEY_LIST}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
  }),
});

export const { useGetLanaugeListQuery, useGetKeyByListMutation } = staticService;
