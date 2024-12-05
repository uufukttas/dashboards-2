import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { addEnergyPriceRequest } from '../../servicePointDetails';
import { Post } from '../../types';
import {
  IChargeUnitProps,
  IConnectorProps,
  IDeleteComissionRequestProps,
  IDeleteEnergyPriceRequestProps,
  IDeleteServicePointPermissionRequestProps,
  IFeatureItemProps,
  IGetChargePointConnetorsRequestProps,
  IGetChargeUnitsRequestProps,
  IGetServicePointDataRequestProps,
  IServicePoinDetailsInfo,
  IServicePointDetailResponseProps,
  IServicePointsDetailResponseProps,
  IStationFeatureProps,
  IStationFeatureRequestProps,
  IStationIdRequestProps,
  IStationSelectedValuesRequestProps,
} from './servicePointDetails.interface';

const authService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addEnergyPrice: builder.mutation<IServicePointDetailResponseProps[], Post>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.ADD_ENERGY_PRICE}`,
      }),
    }),
    addWorkingHours: builder.mutation<IServicePointDetailResponseProps[], Post>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.ADD_WORKING_HOURS}`,
      }),
    }),
    deleteComission: builder.mutation<IServicePointDetailResponseProps[], Post<IDeleteComissionRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.UPDATE_COMISSION_RATE}`,
      }),
    }),
    deleteEnergyPrice: builder.mutation<IServicePointDetailResponseProps[], Post<IDeleteEnergyPriceRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.REMOVE_ENERGY_PRICE}`,
      }),
    }),
    deleteServicePointPermission: builder.mutation<
      IServicePointDetailResponseProps[],
      Post<IDeleteServicePointPermissionRequestProps>
    >({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.AUTH}${ENDPOINTS.CHARGE_POINT_USER_DELETE}`,
      }),
    }),
    getChargePointConnetorsV2: builder.mutation<
      { [key: string]: IConnectorProps[] | undefined }[],
      Post<IGetChargePointConnetorsRequestProps>
    >({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.STATION_INFO}${ENDPOINTS.GET_CHARGE_POINT_CONNECTORSV2}`,
      }),
    }),
    getChargeUnits: builder.mutation<IChargeUnitProps[], Post<IGetChargeUnitsRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.GET_STATION_SETTINGS}`,
      }),
    }),
    getChargePointFeatureStatus: builder.query({
      query: () => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.VALUES}${ENDPOINTS.GET_CHARGE_POINT_FEATURES}`,
      }),
    }),
    getChargePointInvestors: builder.query({
      query: () => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.VALUES}${ENDPOINTS.GET_INVESTORS}`,
      }),
    }),
    getComissionDetails: builder.mutation<IServicePointDetailResponseProps, Post<IStationIdRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.SELECT_COMISSION_RATE}`,
      }),
    }),
    getEnergyPriceDetails: builder.mutation<IServicePointDetailResponseProps[], Post<IStationIdRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.GET_ENERGY_PRICE}`,
      }),
    }),
    getPermissionRequest: builder.mutation<IServicePointDetailResponseProps[], Post<IStationIdRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.AUTH}${ENDPOINTS.CHARGE_POINT_USERS}`,
      }),
    }),
    getServicePointData: builder.mutation<IServicePointsDetailResponseProps[], Post<IGetServicePointDataRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.GET_STATION_BY_ID}`,
      }),
    }),
    getServicePointImages: builder.query({
      query: ({ params }) => ({
        params,
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.STATION_POINT}${ENDPOINTS.GET_IMAGE_LIST}`,
      }),
    }),
    getServicePointInformation: builder.mutation<IServicePoinDetailsInfo[], Post<IStationIdRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.STATION_INFO}${ENDPOINTS.GET_BY_STATION_ID}`,
      }),
    }),
    getStationSelectedValues: builder.mutation<IStationFeatureProps[], Post<IStationSelectedValuesRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.STATION_FEATURE}${ENDPOINTS.STATION_SELECTED_VALUES}`,
      }),
    }),
    getStationFeatureValues: builder.mutation<IFeatureItemProps[], Post<IStationFeatureRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.STATION_FEATURE}${ENDPOINTS.GET_FEATURE_VALUES}`,
      }),
    }),
    getWorkingHours: builder.mutation<IServicePointDetailResponseProps[], Post>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.GET_WORKING_HOURS}`,
      }),
    }),
    updateWorkingHours: builder.mutation<IServicePointDetailResponseProps[], Post>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.UPDATE_WOKRING_HOURS}`,
      }),
    }),
  }),
});

export const {
  useAddEnergyPriceMutation,
  useAddWorkingHoursMutation,
  useDeleteComissionMutation,
  useDeleteEnergyPriceMutation,
  useDeleteServicePointPermissionMutation,
  useGetChargePointConnetorsV2Mutation,
  useGetChargeUnitsMutation,
  useGetChargePointFeatureStatusQuery,
  useGetChargePointInvestorsQuery,
  useGetComissionDetailsMutation,
  useGetEnergyPriceDetailsMutation,
  useGetPermissionRequestMutation,
  useGetServicePointDataMutation,
  useGetServicePointImagesQuery,
  useGetServicePointInformationMutation,
  useGetStationSelectedValuesMutation,
  useGetStationFeatureValuesMutation,
  useGetWorkingHoursMutation,
  useUpdateWorkingHoursMutation,
} = authService;
