import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ApiRoutes, HTTP} from '@weddesign/enums';

export interface FetchWrapper {
    GET: <T>(url: ApiRoutes, config?: AxiosRequestConfig) => Promise<T>;
    POST: <T, B>(url: ApiRoutes, body: B, config?: AxiosRequestConfig) => Promise<T>;
    PATCH: <T, B>(
        url: ApiRoutes,
        body: B,
        config?: AxiosRequestConfig,
    ) => Promise<T>;
}

export const fetchWrapper = (baseApiUrl: string): FetchWrapper => {
    const instance = axios.create({
        baseURL: baseApiUrl,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const request = async <T, B>(
        url: ApiRoutes,
        method: HTTP,
        body?: B,
        config: AxiosRequestConfig = {},
    ): Promise<T> => {
        try {
            const response: AxiosResponse<T> = await instance({
                url,
                method: method.toLowerCase() as AxiosRequestConfig['method'],
                data: body,
                ...config,
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw error.response?.data || error.message || 'Unknown error';
            } else {
                throw error;
            }
        }
    };

    return {
        GET: <T>(url: ApiRoutes, config: AxiosRequestConfig = {}) =>
            request<T, undefined>(url, HTTP.GET, undefined, config),
        POST: <T, B>(url: ApiRoutes, body: B, config: AxiosRequestConfig = {}) =>
            request<T, B>(url, HTTP.POST, body, config),
        PATCH: <T, B>(url: ApiRoutes, body: B, config: AxiosRequestConfig = {}) =>
            request<T, B>(url, HTTP.PATCH, body, config),
    };
};
