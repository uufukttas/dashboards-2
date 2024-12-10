import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Delete, Get, Post } from '../../types';
import { IDeviceBrandDataProps, IDeviceResponsesProps } from './devices.interface';

const deviceServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDeviceBrand: builder.mutation<IDeviceResponsesProps[], Post<FormData>>({
      query: ({ body }) => ({
        body: body,
        headers: { 'Content-Type': 'multipart/form-data' },
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.ADD_DEVICE_BRAND}`,
      }),
      invalidatesTags: ['DeviceBrands'],
    }),
    addDeviceModel: builder.mutation<IDeviceResponsesProps[], Post<FormData>>({
      query: ({body}) => ({
        body: body,
        headers: { 'Content-Type': 'multipart/form-data' },
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.ADD_DEVICE_MODEL}`,
      }),
      invalidatesTags: ['DeviceModels'],
    }),
    addDeviceConnector: builder.mutation<IDeviceResponsesProps[], Post>({
      query: ({ body }) => ({
        body: body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.ADD_DEVICE_CONNECTOR}`,
      }),
      invalidatesTags: ['DeviceConnectors'],
    }),  
    deleteDeviceBrand: builder.mutation<IDeviceResponsesProps[], Delete>({
      query: (id) => ({
        body: id ,
        method: ApiServiceMethods.DELETE,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.REMOVE_DEVICE_BRAND}`,
      }),
      invalidatesTags: ['DeviceBrands'],
    }),
    deleteDeviceConnector: builder.mutation<IDeviceResponsesProps[], Delete>({
      query: (id) => ({
        body: id,
        method: ApiServiceMethods.DELETE,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.DELETE_DEVICE_CONNECTOR}`,
      }),
      invalidatesTags: ['DeviceConnectors'],
    }),
    deleteDeviceModel: builder.mutation<IDeviceResponsesProps[], Delete>({
      query: (id) => ({
        body: id,
        method: ApiServiceMethods.DELETE,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.REMOVE_DEVICE_MODEL}`,
      }),
      invalidatesTags: ['DeviceModels'],
    }),
    editDeviceBrand: builder.mutation<IDeviceResponsesProps[], Post<FormData>>({
      query: ({ body }) => ({
        body: body,
        headers: { 'Content-Type': 'multipart/form-data' },
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.EDIT_DEVICE_BRAND}`,
      }),
      invalidatesTags: ['DeviceBrands'],
    }),
    editDeviceConnector: builder.mutation<IDeviceResponsesProps[], Post>({
      query: ({ body }) => ({
        body: body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.EDIT_DEVICE_CONNECTOR}`,
      }),
      invalidatesTags: ['DeviceConnectors', 'DeviceConnector'],
    }),
    editDeviceModel: builder.mutation<IDeviceResponsesProps[], Post<FormData>>({
      query: ({ body }) => ({
        body: body,
        headers: { 'Content-Type': 'multipart/form-data' },
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.EDIT_DEVICE_MODEL}`,
      }),
      invalidatesTags: ['DeviceModels', 'DeviceModel'],
    }),
    getConnectorById: builder.query<IDeviceResponsesProps, number>({
      query: (connectorId) => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.GET_CONNECTOR_BY_ID}?connectorId=${connectorId}`,
      }),
      providesTags: ['DeviceConnector'],
    }),
    getConnectorInfo: builder.mutation<IDeviceResponsesProps[], Post<{ brandId: number }>>({
      query: ({ body }) => ({
        body: body,
        method: ApiServiceMethods.POST,
        url: `${ENDPOINTS.VALUES}${ENDPOINTS.GET_CONNECTOR_MODELS}`,
      }),
    }),
    getConnectors: builder.query<IDeviceResponsesProps[], number>({
      query: (modelId) => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.GET_CONNECTORS}?modelId=${modelId}`,
      }),
      providesTags: ['DeviceConnectors'],
    }),
    getConnectorTypes: builder.query<IDeviceResponsesProps[], null>({
      query: () => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.GET_DEVICE_CONNECTOR_TYPES}`,
      }),
    }),
    getBrandById: builder.query<IDeviceBrandDataProps, number>({
      query: (brandId) => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.GET_BRAND_BY_ID}?brandId=${brandId}`,
      }),
    }),
    getDeviceBrands: builder.query<IDeviceResponsesProps[], Get<{}>>({
      query: () => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.VALUES}${ENDPOINTS.GET_BRANDS}`,
      }),
      providesTags: ['DeviceBrands'],
    }),
    getDeviceModelById: builder.query<IDeviceResponsesProps, number>({
      query: (modelId) => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.DEVICE}${ENDPOINTS.GET_MODEL_BY_ID}?modelId=${modelId}`,
      }),
      providesTags: ['DeviceModel'],
    }),
    getDeviceModels: builder.query<IDeviceResponsesProps[], number>({
      query: (brandId) => ({
        method: ApiServiceMethods.GET,
        url: `${ENDPOINTS.VALUES}${ENDPOINTS.GET_MODELS}?brandId=${brandId}`,
      }),
      providesTags: ['DeviceModels'],
    }),
  }),
});

export const {
  useAddDeviceBrandMutation,
  useAddDeviceModelMutation,
  useAddDeviceConnectorMutation,
  useDeleteDeviceBrandMutation,
  useDeleteDeviceConnectorMutation,
  useDeleteDeviceModelMutation,
  useEditDeviceBrandMutation,
  useEditDeviceConnectorMutation,
  useEditDeviceModelMutation,
  useGetBrandByIdQuery,
  useGetConnectorByIdQuery,
  useGetConnectorInfoMutation,
  useGetConnectorsQuery,
  useGetConnectorTypesQuery,
  useGetDeviceBrandsQuery,
  useGetDeviceModelByIdQuery,
  useGetDeviceModelsQuery,
} = deviceServices;
