import { ApiServiceMethods } from './constant';

export type BaseQueryFunctionParams = {
  url: string;
  method: ApiServiceMethods;
  prefix?: string;
  headers?: Record<string, unknown>;
  body?: Record<string, unknown> | unknown;
  params?: Record<string, unknown> | unknown;
};
