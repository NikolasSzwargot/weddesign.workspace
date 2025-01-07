import {fetchWrapper} from '@weddesign/api';
import {API_URL} from '@weddesign-mobile/config';

import {useUser} from '../components/providers/UserProvider';

export const useUnauthorizedFetch = () => {
    const {onUnauthorized, onError} = useUser();
    return fetchWrapper(API_URL, undefined, onUnauthorized, onError);
};
