import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ApiRoutes} from '@weddesign/enums';

export enum HTTP {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
}

export interface FetchWrapper {
    GET: <T>(url: ApiRoutes, config?: AxiosRequestConfig) => Promise<T>;
    POST: <T, B = undefined>(
        url: ApiRoutes,
        body?: B,
        config?: AxiosRequestConfig,
    ) => Promise<T>;
    PATCH: <T, B = undefined>(
        url: ApiRoutes,
        body?: B,
        config?: AxiosRequestConfig,
    ) => Promise<T>;
    DELETE: <T>(url: ApiRoutes, config?: AxiosRequestConfig) => Promise<T>;
}

export const fetchWrapper = (
    baseApiUrl: string,
    getToken?: () => string | null,
    onUnauthorized?: () => void,
    onInternal?: () => void,
): FetchWrapper => {
    const instance = axios.create({
        baseURL: baseApiUrl,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use(
        (config) => {
            const token = getToken ? getToken() : null;
            if (token && config.headers) {
                config.headers.set('Authorization', `Bearer ${token}`);
            }
            return config;
        },
        (error) => Promise.reject(error),
    );

    const request = async <T, B = undefined>(
        url: string,
        method: HTTP,
        body?: B,
        config: AxiosRequestConfig = {},
    ): Promise<T> => {
        try {
            //@NOTE: The function is guarantee to work
            // noinspection TypeScriptValidateTypes
            const response: AxiosResponse<T> = await instance({
                url,
                method: method.toLowerCase() as AxiosRequestConfig['method'],
                data: body,
                ...config,
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status === 401) {
                    if (onUnauthorized) {
                        onUnauthorized();
                    }
                } else if (status === 500) {
                    if (onInternal) {
                        onInternal();
                    }
                }
            }
            return Promise.reject(error);
        }
    };

    return {
        GET: <T>(url: ApiRoutes, config: AxiosRequestConfig = {}) =>
            request<T, undefined>(url, HTTP.GET, undefined, config),
        POST: <T, B = undefined>(
            url: ApiRoutes,
            body?: B,
            config: AxiosRequestConfig = {},
        ) => request<T, B>(url, HTTP.POST, body, config),
        PATCH: <T, B = undefined>(
            url: ApiRoutes,
            body?: B,
            config: AxiosRequestConfig = {},
        ) => request<T, B>(url, HTTP.PATCH, body, config),
        DELETE: <T>(url: ApiRoutes, config: AxiosRequestConfig = {}) =>
            request<T, undefined>(url, HTTP.DELETE, undefined, config),
    };
};
