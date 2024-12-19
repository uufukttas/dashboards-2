import baseApi from '../../baseApi';
import { ApiServiceMethods } from '../../constant';
import { ENDPOINTS } from '../../endpoints';
import { Get, Post } from '../../types';
import {
  IKnowledgeBase,
  IKnowledgeBaseCategory,
  IKnowledgeBaseCategoryCreateBody,
  IKnowledgeBaseCategoryDeleteBody,
  IKnowledgeBaseCategoryUpdateBody,
  IKnowledgeBaseCreateBody,
  IKnowledgeBaseDeleteBody,
  IKnowledgeBaseUpdateBody,
} from './knowledgebase.interface';

const knowledgeBaseService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getKnowledgeBaseList: builder.query<Array<IKnowledgeBase>, Get>({
      query: () => ({
        url: `${ENDPOINTS.KNOWLEDGEBASE}${ENDPOINTS.GET_KNOWLEDGEBASE_LIST}`,
        method: ApiServiceMethods.GET,
      }),
      providesTags: ['knowledgebase'],
    }),
    getKnowledgeBaseById: builder.query<IKnowledgeBase, Get<{ knowledgebaseId: number }>>({
      query: ({ params }) => ({
        url: `${ENDPOINTS.KNOWLEDGEBASE}${ENDPOINTS.GET_KNOWLEDGEBASE_BY_ID}`,
        method: ApiServiceMethods.GET,
        params,
      }),
      providesTags: ['knowledgebase'],
    }),
    addNewKnowledgeBase: builder.mutation<IKnowledgeBase, Post<IKnowledgeBaseCreateBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.KNOWLEDGEBASE}${ENDPOINTS.ADD_KNOWLEDGEBASE}`,
        method: ApiServiceMethods.POST,
        body,
      }),
      invalidatesTags: ['knowledgebase'],
    }),
    editKnowledgeBase: builder.mutation<IKnowledgeBase, Post<IKnowledgeBaseUpdateBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.KNOWLEDGEBASE}${ENDPOINTS.EDIT_KNOWLEDGEBASE}`,
        method: ApiServiceMethods.POST,
        body,
      }),
      invalidatesTags: ['knowledgebase'],
    }),
    removeKnowledgeBase: builder.mutation<IKnowledgeBase, Post<IKnowledgeBaseDeleteBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.KNOWLEDGEBASE}${ENDPOINTS.REMOVE_KNOWLEDGE_BASE}`,
        method: ApiServiceMethods.DELETE,
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['knowledgebase'],
    }),
    getKnowledgeBaseCategoryList: builder.query<Array<IKnowledgeBaseCategory>, Get>({
      query: () => ({
        url: `${ENDPOINTS.KNOWLEDGE_CATEGORY}${ENDPOINTS.GET_KNOWLEDGEBASE_CATEGORY_LIST}`,
        method: ApiServiceMethods.GET,
      }),
      providesTags: ['knowledgebase_category'],
    }),
    getKnowledgeBaseCategoryById: builder.query<IKnowledgeBaseCategory, Get<{ knowledgeCategoryId: number }>>({
      query: ({ params }) => ({
        url: `${ENDPOINTS.KNOWLEDGE_CATEGORY}${ENDPOINTS.GET_KNOWLEDGEBASE_CATEGORY_BY_ID}`,
        method: ApiServiceMethods.GET,
        params,
      }),
      providesTags: ['knowledgebase_category'],
    }),
    addNewKnowledgeBaseCategory: builder.mutation<IKnowledgeBaseCategory, Post<IKnowledgeBaseCategoryCreateBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.KNOWLEDGE_CATEGORY}${ENDPOINTS.ADD_NEW_KNOWLEDGEBASE_CATEGORY}`,
        method: ApiServiceMethods.POST,
        body,
      }),
      invalidatesTags: ['knowledgebase_category'],
    }),
    editKnowledgeBaseCategory: builder.mutation<IKnowledgeBaseCategory, Post<IKnowledgeBaseCategoryUpdateBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.KNOWLEDGE_CATEGORY}${ENDPOINTS.EDIT_KNOWLEDGEBASE_CATEGORY}`,
        method: ApiServiceMethods.POST,
        body,
      }),
      invalidatesTags: ['knowledgebase_category'],
    }),
    removeKnowledgeBaseCategory: builder.mutation<IKnowledgeBaseCategory, Post<IKnowledgeBaseCategoryDeleteBody>>({
      query: ({ body }) => ({
        url: `${ENDPOINTS.KNOWLEDGE_CATEGORY}${ENDPOINTS.REMOVE_KNOWLEDGEBASE_CATEGORY}`,
        method: ApiServiceMethods.POST,
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['knowledgebase_category'],
    }),
  }),
});

export const {
  useGetKnowledgeBaseListQuery,
  useGetKnowledgeBaseByIdQuery,
  useAddNewKnowledgeBaseMutation,
  useEditKnowledgeBaseMutation,
  useRemoveKnowledgeBaseMutation,
  useGetKnowledgeBaseCategoryListQuery,
  useGetKnowledgeBaseCategoryByIdQuery,
  useAddNewKnowledgeBaseCategoryMutation,
  useEditKnowledgeBaseCategoryMutation,
  useRemoveKnowledgeBaseCategoryMutation,
} = knowledgeBaseService;
