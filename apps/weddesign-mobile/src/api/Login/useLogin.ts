import {useMutation} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';
import {AccessTokenDto} from '../../components/providers/UserProvider';

export type LoginDto = {
    email: string;
    password: string;
};

export const useLogin = () => {
    const api = useUnauthorizedFetch();

    return useMutation(({email, password}: LoginDto) => {
        return api.POST<AccessTokenDto, LoginDto>(ApiRoutes.Login, {
            email,
            password,
        });
    });
};
