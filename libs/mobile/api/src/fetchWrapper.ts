import {HTTP} from '@weddesign/enums';

interface FetchWrapper {
    GET: <T>(
        url: string,
        headers?: Record<string, string>,
    ) => Promise<T | {error: unknown}>;
    POST: <T, B>(
        url: string,
        body: B,
        headers?: Record<string, string>,
    ) => Promise<T | {error: unknown}>;
    PATCH: <T, B>(
        url: string,
        body: B,
        headers?: Record<string, string>,
    ) => Promise<T | {error: unknown}>;
}

export const fetchWrapper = (baseApiUrl: string): FetchWrapper => {
    const request = async <T, B>(
        url: string,
        method: HTTP,
        body?: B,
        headers: Record<string, string> = {},
    ): Promise<T | {error: unknown}> => {
        const controller = new AbortController();

        try {
            const res = await fetch(`${baseApiUrl}${url}`, {
                method: method.toUpperCase(),
                signal: controller.signal,
                body:
                    body && typeof body === 'object'
                        ? JSON.stringify(body)
                        : undefined,
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                    ...headers,
                },
            });

            if (!res.ok) {
                const error = await res.json();
                return {error: error.code || 'Unknown error'};
            }
            return await res.json();
        } catch (err) {
            return {error: err};
        } finally {
            controller.abort();
        }
    };

    return {
        GET: <T>(url: string, headers: Record<string, string> = {}) =>
            request<T, undefined>(url, HTTP.GET, undefined, headers),
        POST: <T, B>(url: string, body: B, headers: Record<string, string> = {}) =>
            request<T, B>(url, HTTP.POST, body, headers),
        PATCH: <T, B>(url: string, body: B, headers: Record<string, string> = {}) =>
            request<T, B>(url, HTTP.PATCH, body, headers),
    };
};
