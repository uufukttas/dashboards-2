import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';

const staticService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLanaugeList: builder.query({
      query: () => ({
        url: ENDPOINTS.LANGUAGE_LIST,
        method: ApiServiceMethods.GET,
      }),
    }),
  }),
});

export const { useGetLanaugeListQuery } = staticService;
