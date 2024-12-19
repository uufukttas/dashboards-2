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
    getKnowledgeBaseList: builder.query<IKnowledgeBase, Get>({
      query: () => ({
        url: ENDPOINTS.GET_KNOWLEDGEBASE_LIST,
        method: ApiServiceMethods.GET,
      }),
    }),
    getKnowledgeBaseById: builder.query<IKnowledgeBase, Get<{ knowledgebaseId: number }>>({
      query: ({ params }) => ({
        url: ENDPOINTS.GET_KNOWLEDGEBASE_BY_ID,
        method: ApiServiceMethods.GET,
        params,
      }),
    }),
    addNewKnowledgeBase: builder.mutation<IKnowledgeBase, Post<IKnowledgeBaseCreateBody>>({
      query: (body) => ({
        url: ENDPOINTS.ADD_KNOWLEDGEBASE,
        method: ApiServiceMethods.POST,
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    editKnowledgeBase: builder.mutation<IKnowledgeBase, Post<IKnowledgeBaseUpdateBody>>({
      query: (body) => ({
        url: ENDPOINTS.EDIT_KNOWLEDGEBASE,
        method: ApiServiceMethods.POST,
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    removeKnowledgeBase: builder.mutation<IKnowledgeBase, Post<IKnowledgeBaseDeleteBody>>({
      query: (body) => ({
        url: ENDPOINTS.REMOVE_KNOWLEDGE_BASE,
        method: ApiServiceMethods.POST,
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    getKnowledgeBaseCategoryList: builder.query<IKnowledgeBaseCategory, Get>({
      query: () => ({
        url: ENDPOINTS.GET_KNOWLEDGEBASE_CATEGORY_LIST,
        method: ApiServiceMethods.GET,
      }),
    }),
    getKnowledgeBaseCategoryById: builder.query<IKnowledgeBaseCategory, Get<{ knowledgeCategoryId: number }>>({
      query: ({ params }) => ({
        url: ENDPOINTS.GET_KNOWLEDGEBASE_CATEGORY_BY_ID,
        method: ApiServiceMethods.GET,
        params,
      }),
    }),
    addNewKnowledgeBaseCategory: builder.mutation<IKnowledgeBaseCategory, Post<IKnowledgeBaseCategoryCreateBody>>({
      query: (body) => ({
        url: ENDPOINTS.ADD_NEW_KNOWLEDGEBASE_CATEGORY,
        method: ApiServiceMethods.POST,
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    editKnowledgeBaseCategory: builder.mutation<IKnowledgeBaseCategory, Post<IKnowledgeBaseCategoryUpdateBody>>({
      query: (body) => ({
        url: ENDPOINTS.EDIT_KNOWLEDGEBASE_CATEGORY,
        method: ApiServiceMethods.POST,
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    removeKnowledgeBaseCategory: builder.mutation<IKnowledgeBaseCategory, Post<IKnowledgeBaseCategoryDeleteBody>>({
      query: (body) => ({
        url: ENDPOINTS.REMOVE_KNOWLEDGEBASE_CATEGORY,
        method: ApiServiceMethods.POST,
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
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
