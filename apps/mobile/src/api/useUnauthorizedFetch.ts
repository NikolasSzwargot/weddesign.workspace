import {fetchWrapper} from '@weddesign/api';
import {API_URL} from '@env';

export const useUnauthorizedFetch = () => {
    return fetchWrapper(API_URL);
};
