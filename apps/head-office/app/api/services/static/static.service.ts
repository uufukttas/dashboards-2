import baseApi from '../../baseApi';

const staticService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatic: builder.query({
      query: () => 'static',
    }),
  }),
});
