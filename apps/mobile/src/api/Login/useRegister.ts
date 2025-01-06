import {useMutation} from 'react-query';
import {CreateUserDto, UserDto} from '@shared/dto';
import {ApiRoutes} from '@weddesign/enums';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

export type RegisterDto = {
    email: string;
    password: string;
    user: CreateUserDto;
};

export const useRegister = () => {
    const api = useUnauthorizedFetch();

    return useMutation(({email, password, user}: RegisterDto) => {
        return api.POST<UserDto, RegisterDto>(ApiRoutes.Register, {
            email,
            password,
            user,
        });
    });
};
