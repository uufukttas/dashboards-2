import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { IUserAggrement } from './userAggrement.interface';

const userAggrementService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgreementDefinitionList: builder.query<Array<IUserAggrement>, void>({
      query: () => ({
        url: `${ENDPOINTS.AGGREMENT}${ENDPOINTS.GET_AGREEMENT_DEFINITION_LIST}`,
        method: ApiServiceMethods.GET,
      }),
    }),
  }),
});

export const { useGetAgreementDefinitionListQuery } = userAggrementService;
