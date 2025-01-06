import {fetchWrapper} from '@weddesign/api';

export const useUnauthorizedFetch = () => {
    return fetchWrapper('http://192.168.8.102:3000');
};
