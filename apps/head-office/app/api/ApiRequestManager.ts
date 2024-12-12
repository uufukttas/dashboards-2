import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { hideAlert, showAlert } from '../redux/features/alertInformation';
import { toggleLoadingVisibility } from '../redux/features/isLoadingVisible';
import { RootState } from '../redux/store';
import { BaseQueryFunctionParams } from './ApiRequestManager.interface';
import { silentErrorServices } from './silentErrorServices';
import { silentLoadingServices } from './silentLoadingServices';
import { successResultServices } from './successResultServices';

class ApiRequestManager {
  baseUrl: string = '';
  axiosInstance: AxiosInstance | null = null;
  accessToken: string | null = null;

  constructor({ baseUrl = '' }: { baseUrl?: string } = {}) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  private setAccessToken = (): void => {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    if (token && this.axiosInstance) {
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };

  private handleErrors = (dispatch: ThunkDispatch<RootState, unknown, Action>, error: AxiosError): void => {
    const pushError = (message: string) => {
      dispatch(
        showAlert({
          message: message,
          type: 'error',
        }),
      );
    };

    switch (error.response?.status) {
      case HttpStatusCode.BadRequest:
        pushError(error.response.statusText || 'Hatalı İstek');
        break;
      case HttpStatusCode.Unauthorized:
        pushError('Oturum süreniz dolmuştur. Lütfen tekrar giriş yapın.');
        setTimeout(() => {
          window.localStorage.removeItem('token');
          window.location.href = '/';
        }, 700);
        break;
      case HttpStatusCode.Forbidden:
        pushError('Yetkisiz İşlem');
        break;
      case HttpStatusCode.NotFound:
        pushError(error.response.statusText || 'Bulunamadı');
        break;
      case HttpStatusCode.InternalServerError:
        pushError(error.response.statusText || 'Sunucu Hatası');
        break;
      default:
        pushError('Bir hata oluştu');
    }
  };

  private pushSuccess = (dispatch: ThunkDispatch<RootState, unknown, Action>, message: string): void => {
    dispatch(
      showAlert({
        isVisible: true,
        message: message || 'İşlem Başarılı',
        type: 'success',
      }),
    );

    setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);
  };

  public request =
    (): BaseQueryFn<BaseQueryFunctionParams> =>
    async ({ body = {}, headers, method, params, url }, { dispatch, endpoint }, extraOptions) => {
      this.setAccessToken();

      try {
        !silentLoadingServices.includes(endpoint) && dispatch(toggleLoadingVisibility(true));

        const result = await this?.axiosInstance?.request({
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          data: body,
          method,
          params,
          url,
        });

        successResultServices.includes(endpoint) && this.pushSuccess(dispatch, result?.data.message);

        return { data: result?.data.data || result };
      } catch (error) {
        !silentErrorServices.includes(endpoint) && this.handleErrors(dispatch, error as AxiosError);

        return {
          error,
        };
      } finally {
        dispatch(toggleLoadingVisibility(false));
      }
    };
}

export default ApiRequestManager;
