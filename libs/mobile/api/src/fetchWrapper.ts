import {HTTP} from '@weddesign/enums';

export default async <T, B>(
    apiUrl: string,
    url: string,
    method: HTTP,
    body: B | undefined = undefined,
    headers = {},
): Promise<T | {error: unknown}> => {
    const controller = new AbortController();
    try {
        const res = await fetch(`${apiUrl}${url}`, {
            method: method.toUpperCase(),
            signal: controller.signal,
            body: typeof body === 'object' ? JSON.stringify(body) : undefined,
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                ...headers,
            },
        });
        if (!res.ok) {
            const error = await res.json();
            return {error: error.code};
        }
        return await res.json();
    } catch (err) {
        return {error: err};
    } finally {
        controller.abort();
    }
};
