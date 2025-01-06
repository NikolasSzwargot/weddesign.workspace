import {fetchWrapper} from '@weddesign/api';
import {API_URL} from '@weddesign-mobile/config';

export const useUnauthorizedFetch = () => {
    return fetchWrapper(API_URL);
};
