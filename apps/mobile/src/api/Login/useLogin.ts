import {useMutation} from 'react-query';
import {UserDto} from '@shared/dto';
import {ApiRoutes} from '@weddesign/enums';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

type LoginDto = {
    email: string;
    password: string;
};

export const useLogin = () => {
    const api = useUnauthorizedFetch();

    return useMutation(({email, password}: LoginDto) => {
        return api.POST<UserDto, LoginDto>(ApiRoutes.Login, {email, password});
    });
};
