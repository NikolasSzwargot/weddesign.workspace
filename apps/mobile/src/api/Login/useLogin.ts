import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

type LoginDto = {
    email: string;
    password: string;
};

export const useLogin = ({email, password}: LoginDto) => {
    const api = useUnauthorizedFetch();

    return useQuery<boolean, Error>([ApiRoutes.Login], () =>
        api.POST<boolean, LoginDto>(ApiRoutes.Login, {email, password}),
    );
};
