import {fetchWrapper} from '@weddesign/api';
import {API_URL} from '@env';

export const useFetch = () => {
    console.log(API_URL);
    return fetchWrapper('http://192.168.8.104:3000');
};
