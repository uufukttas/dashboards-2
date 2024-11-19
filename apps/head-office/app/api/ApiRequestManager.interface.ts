import { RequestMethods } from './constant';

export type BaseQueryFunctionParams = {
  url: string;
  method: RequestMethods;
  prefix?: string;
  headers?: Record<string, unknown>;
  body?: Record<string, unknown> | unknown;
  params?: Record<string, unknown> | unknown;
};
