import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Post } from '../../types';
import {
  CompanyResponse,
  IAddStationInfoRequestBody,
  IAddStationRequestBody,
  IDeleteChargePointRequestBody,
  IGetAllServicePointsRequestBody,
  IGetServicePointData,
  IUpdateStationInfoRequestBody,
  IUpdateStationRequestBody,
  ServicePoint
} from './servicePoints.interface';

const servicePointService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getServicePoints: build.mutation<Array<ServicePoint>, Post<IGetAllServicePointsRequestBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.GET_ALL_POINTS}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    deleteServicePoint: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.DELETE_STATION}`,
        method: ApiServiceMethods.POST,
        body: {
          id,
        },
      }),
    }),
    addStation: build.mutation<void, Post<IAddStationRequestBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.ADD_STATION}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    updateStation: build.mutation<void, Post<IUpdateStationRequestBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.UPDATE_STATION}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    addStationInfo: build.mutation<void, Post<IAddStationInfoRequestBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.STATION_INFO}${ENDPOINTS.ADD_STATION_INFO}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    updateStationInfo: build.mutation<void, Post<IUpdateStationInfoRequestBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.STATION_INFO}${ENDPOINTS.UPDATE_STATION_INFO}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    deleteChargePoint: build.mutation<void, Post<IDeleteChargePointRequestBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.UPDATE_STATION_SETTINGS}`,
        method: ApiServiceMethods.POST,
        body: JSON.stringify(body),
      }),
    }),
    getServicePointData: build.mutation<IGetServicePointData, Post<number>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.GET_STATION_BY_ID}`,
        method: ApiServiceMethods.POST,
        body: { id: body },
      }),
    }),
    getServicePointInformation: build.mutation<void, Post<number>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.STATION_INFO}${ENDPOINTS.GET_BY_STATION_ID}`,
        method: ApiServiceMethods.POST,
        body: { stationId: body },
      }),
    }),
    getCompanies: build.query<CompanyResponse[], void>({
      query: () => ({
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.GET_COMPANIES}`,
        method: ApiServiceMethods.GET,
      }),
    }),
    getResellers: build.query<CompanyResponse[], void>({
      query: () => ({
        url: `${ENDPOINTS.SERVICE_POINT}${ENDPOINTS.GET_RESELLERS}`,
        method: ApiServiceMethods.GET,
      }),
    }),
    addStationFeature: build.mutation<void, Post<string>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.STATION_FEATURE}${ENDPOINTS.ADD_STATION_FEATURE}`,
        method: ApiServiceMethods.POST,
        body,
      }),
    }),
    getStationFeatures: build.mutation<void, Post<number>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.STATION_FEATURE}${ENDPOINTS.GET_STATION_FEATURE}`,
        method: ApiServiceMethods.POST,
        body: { stationId: body },
      }),
    }),
    getStationImages: build.query<void, string>({
      query: (stationId) => ({
        url: `${ENDPOINTS.STATION_POINT}${ENDPOINTS.GET_IMAGE_LIST}`,
        method: ApiServiceMethods.GET,
        params: { stationId },
      }),
    }),
    getFeatureValues: build.mutation<Array<{ rid: number; name: string }>, Post<number>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.STATION_FEATURE}${ENDPOINTS.GET_FEATURE_VALUES}`,
        method: ApiServiceMethods.POST,
        body: { stationFeatureType: body },
      }),
    }),
  }),
});

export const {
  useGetServicePointsMutation,
  useDeleteServicePointMutation,
  useAddStationMutation,
  useUpdateStationMutation,
  useAddStationInfoMutation,
  useUpdateStationInfoMutation,
  useDeleteChargePointMutation,
  useGetServicePointDataMutation,
  useGetServicePointInformationMutation,
  useGetCompaniesQuery,
  useGetResellersQuery,
  useAddStationFeatureMutation,
  useGetStationFeaturesMutation,
  useGetStationImagesQuery,
  useGetFeatureValuesMutation,
} = servicePointService;
