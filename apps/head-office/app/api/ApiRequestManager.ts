import { ThunkDispatch } from '@reduxjs/toolkit';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { BaseQueryFunctionParams } from './ApiRequestManager.interface';
import { showAlert } from '../redux/features/alertInformation';
import { successResultServices } from './successResultServices';
import { silentErrorServices } from './silentErrorServices';
import { toggleLoadingVisibility } from '../redux/features/isLoadingVisible';
import { silentLoadingServices } from './silentLoadingServices';

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

  private setAccessToken =  () => {
    const token =  localStorage.getItem('token');

    if (!token) {
      return;
    }

    if (token && this.axiosInstance) {
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };

  private handleErrors = (dispatch: ThunkDispatch<any, any, any>, error: AxiosError) => {
    const pushError = (message: string) => {
      dispatch(
        showAlert({
          message: message,
          type: 'error',
        })
      );
    };

    switch (error.response?.status) {
      case HttpStatusCode.BadRequest:
        pushError(error.response.statusText || 'Hatalı İstek');
        break;
      case HttpStatusCode.Unauthorized:
        pushError('Yetkisiz erişim. Lütfen tekrar giriş yapın.');
        window.location.href = '/';
        localStorage.removeItem('token');
        window.location.reload();
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

  private pushSuccess = (dispatch: ThunkDispatch<any, any, any>, message: string) => {
    dispatch(
      showAlert({
        message: message || 'İşlem Başarılı',
        type: 'success',
      })
    );
  };

  public request =
    (): BaseQueryFn<BaseQueryFunctionParams> =>
    async ({ url, method, headers, body, params }, { dispatch, endpoint }, extraOptions) => {
      this.setAccessToken();

      try {
        !silentLoadingServices.includes(endpoint) && dispatch(toggleLoadingVisibility(true));

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

        successResultServices.includes(endpoint) && this.pushSuccess(dispatch, result?.data.message);

        return { data: result?.data.data || result };
      } catch (error: AxiosError | any) {
        !silentErrorServices.includes(endpoint) && this.handleErrors(dispatch, error);

        return {
          error,
        };
      } finally {
        dispatch(toggleLoadingVisibility(false));
      }
    };
}

export default ApiRequestManager;
