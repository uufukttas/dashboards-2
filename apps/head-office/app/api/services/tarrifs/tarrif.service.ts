import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Post } from '../../types';
import { SingleTariffResponse, Tariff, TariffRequestBody } from './tarrif.interface';

const tariffService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTariffs: builder.mutation<
      Array<Tariff>,
      Post<{
        pageNumber: number;
        name: string;
        userCount?: number;
      }>
    >({
      query: ({ body: { pageNumber, name, userCount = 10000 } }) => ({
        url: `${ENDPOINTS.TARIFF}${ENDPOINTS.GET_TARIFFS}`,
        method: ApiServiceMethods.POST,
        body: { pageNumber, name, userCount },
      }),
    }),
    createTariff: builder.mutation<SingleTariffResponse, Post<TariffRequestBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.TARIFF}${ENDPOINTS.ADD_TARIFF}`,
        method: ApiServiceMethods.POST,
        body: body,
      }),
    }),
    deleteTariff: builder.mutation<void, Post<{ tariffId: number }>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.TARIFF}${ENDPOINTS.DELETE_TARIFF}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
  }),
});

export const { useGetTariffsMutation, useCreateTariffMutation, useDeleteTariffMutation } = tariffService;
