import { ThunkDispatch } from '@reduxjs/toolkit';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { BaseQueryFunctionParams } from './ApiRequestManager.interface';
import { RequestMethods } from './constant';
import { showAlert } from '../redux/features/alertInformation';

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

  private handleErrors = (
    dispatch: ThunkDispatch<any, any, any>,
    error: AxiosError
  ) => {
    if (error.response?.status === 401) {
      // dispatch(logout());
    }
    console.log('dispatch', dispatch);

    dispatch(
      showAlert({
        message: error.response?.data?.message || 'Something went wrong',
        type: 'error',
      })
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
          url,
          params,
          data: body,
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          method,
        });

        return { data: result?.data || result };
      } catch (error: AxiosError | any) {
        this.handleErrors(dispatch, error);
        return {
          error,
        };
      }
    };
}

export default ApiRequestManager;
