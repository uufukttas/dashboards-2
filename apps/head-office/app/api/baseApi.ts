import { createApi } from '@reduxjs/toolkit/query/react';
import ApiRequestManager from './ApiRequestManager';

const requester = new ApiRequestManager({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
});

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: requester.request(),
  endpoints: () => ({}),
});

export default baseApi;
