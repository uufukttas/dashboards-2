import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { IComissionRequestProps, Post } from '../../types';
import {
  IChargeUnitProps,
  IComissionDataProps,
  IConnectorProps,
  IDeleteComissionRequestProps,
  IDeleteEnergyPriceRequestProps,
  IDeleteServicePointPermissionRequestProps,
  IEnergyPriceRequestProps,
  IEnergyPricesDataProps,
  IFeatureItemProps,
  IGetChargePointConnetorsRequestProps,
  IGetChargeUnitsRequestProps,
  IGetServicePointDataRequestProps,
  IServicePoinDetailsInfo,
  IServicePointDetailResponseProps,
  IServicePointPermissionProps,
  IServicePointsDetailResponseProps,
  IStationFeatureProps,
  IStationFeatureRequestProps,
  IStationIdRequestProps,
  IStationSelectedValuesRequestProps,
} from './servicePointDetails.interface';

const authService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addChargePointUserPermission: builder.mutation<
      IServicePointDetailResponseProps[],
      Post<{
        name: string;
        surname: string;
        phoneNumber: string;
        stationId: number;
      }>
    >({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.AUTH}${ENDPOINTS.CHARGE_POINT_USER_CREATE}`,
      }),
    }),
    addComission: builder.mutation<IServicePointDetailResponseProps[], Post<IComissionRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.INSERT_COMISSION_RATE}`,
      }),
    }),
    addEnergyPrice: builder.mutation<IServicePointDetailResponseProps[], Post<IEnergyPriceRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.ADD_ENERGY_PRICE}`,
      }),
    }),
    addServicePointImage: builder.mutation<IServicePointDetailResponseProps[], Post<FormData>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.STATION_POINT}${ENDPOINTS.ADD_IMAGE}`,
      }),
    }),
    addStationSettings: builder.mutation<IServicePoinDetailsInfo[], Post>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.ADD_STATION_SETTINGS}`,
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
    getChargePointFeature: builder.mutation<[], Post>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.STATION_FEATURE}${ENDPOINTS.GET_CHARGE_POINT_FEATURE}`,
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
    getComissionDetails: builder.mutation<IComissionDataProps[], Post<IStationIdRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.SELECT_COMISSION_RATE}`,
      }),
    }),
    getDeviceCode: builder.mutation<string, Post<IStationIdRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.VALUES}${ENDPOINTS.GET_DEVICE_CODE}`,
      }),
    }),
    getEnergyPriceDetails: builder.mutation<IEnergyPricesDataProps[], Post<IStationIdRequestProps>>({
      query: ({ body }) => ({
        body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.GET_ENERGY_PRICE}`,
      }),
    }),
    getFractionType: builder.query({
      query: () => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.TARIFF_SUB_FRACTION_TYPES}`,
      }),
    }),
    getPermissionRequest: builder.mutation<IServicePointPermissionProps[], Post<IStationIdRequestProps>>({
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
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.UPDATE_WORKING_HOURS}`,
      }),
    }),
  }),
});

export const {
  useAddChargePointUserPermissionMutation,
  useAddComissionMutation,
  useAddEnergyPriceMutation,
  useAddServicePointImageMutation,
  useAddStationSettingsMutation,
  useAddWorkingHoursMutation,
  useDeleteComissionMutation,
  useDeleteEnergyPriceMutation,
  useDeleteServicePointPermissionMutation,
  useGetChargePointConnetorsV2Mutation,
  useGetChargeUnitsMutation,
  useGetChargePointFeatureMutation,
  useGetChargePointFeatureStatusQuery,
  useGetChargePointInvestorsQuery,
  useGetComissionDetailsMutation,
  useGetDeviceCodeMutation,
  useGetEnergyPriceDetailsMutation,
  useGetFractionTypeQuery,
  useGetPermissionRequestMutation,
  useGetServicePointDataMutation,
  useGetServicePointImagesQuery,
  useGetServicePointInformationMutation,
  useGetStationSelectedValuesMutation,
  useGetStationFeatureValuesMutation,
  useGetWorkingHoursMutation,
  useUpdateWorkingHoursMutation,
} = authService;
