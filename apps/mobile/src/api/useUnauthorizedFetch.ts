import {fetchWrapper} from '@weddesign/api';
import {API_URL} from '@env';

export const useUnauthorizedFetch = () => {
    console.log(API_URL);
    return fetchWrapper(API_URL);
};
