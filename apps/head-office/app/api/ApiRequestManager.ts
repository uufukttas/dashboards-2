import { ThunkDispatch } from '@reduxjs/toolkit';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { BaseQueryFunctionParams } from './ApiRequestManager.interface';
import { RequestMethods } from './constant';

class ApiRequestManager {
  baseUrl: string = '';
  axiosInstance: AxiosInstance | null = null;

  constructor({ baseUrl = '' }: { baseUrl?: string } = {}) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  private setAccessToken = async () => {
    const token = await localStorage.getItem('access_token');

    this.axiosInstance?.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };
  private handleErrors = (dispatch: ThunkDispatch<any, any, any>) => {
    this.axiosInstance?.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log('Response Error:', error);

        return Promise.reject(error);
      }
    );
  };

  public request =
    (): BaseQueryFn<BaseQueryFunctionParams> =>
    async (
      { url, method, headers, body, params },
      { dispatch, endpoint },
      extraOptions
    ) => {
      try {
        const result = await this.axiosInstance?.request({
          method: method as RequestMethods,
          url,
          body,
          params,
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
        });

        return { data: result?.data || result };
      } catch (error) {
        return {
          error,
        };
      }
    };
}

export default ApiRequestManager;
