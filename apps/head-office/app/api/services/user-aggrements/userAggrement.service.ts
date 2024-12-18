import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Get, Post } from '../../types';
import { IAddNewAggrement, IUserAggrement } from './userAggrement.interface';

const userAggrementService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgreementDefinitionList: builder.query<Array<IUserAggrement>, void>({
      query: () => ({
        url: `${ENDPOINTS.AGGREMENT}${ENDPOINTS.GET_AGREEMENT_DEFINITION_LIST}`,
        method: ApiServiceMethods.GET,
      }),
      providesTags: ['UserAggrement'],
    }),
    getAgreementDefinitionById: builder.query<IUserAggrement, Get>({
      query: ({ params }) => ({
        url: `${ENDPOINTS.AGGREMENT}${ENDPOINTS.GET_AGREEMENT_DEFINITION_BY_ID}`,
        method: ApiServiceMethods.GET,
        params,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      providesTags: ['UserAggrement'],
    }),
    addNewAggrement: builder.mutation<void, Post<IAddNewAggrement>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.AGGREMENT}${ENDPOINTS.ADD_NEW_AGREEMENT}`,
        method: ApiServiceMethods.POST,
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['UserAggrement'],
    }),
  }),
});

export const {
  useGetAgreementDefinitionListQuery,
  useAddNewAggrementMutation,
  useLazyGetAgreementDefinitionByIdQuery,
} = userAggrementService;
