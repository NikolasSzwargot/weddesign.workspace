import {fetchWrapper} from '@weddesign/api';
import {API_URL} from '@env';

export const useFetch = () => {
    return fetchWrapper(API_URL);
};
