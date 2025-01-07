import {fetchWrapper} from '@weddesign/api';
import {API_URL} from '@weddesign-mobile/config';

import {useUser} from '../components/providers/UserProvider';

export const useFetch = () => {
    const {accessToken, onUnauthorized, onError} = useUser();
    return fetchWrapper(
        API_URL,
        () => accessToken.access_token,
        onUnauthorized,
        onError,
    );
};
