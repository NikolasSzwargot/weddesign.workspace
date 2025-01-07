import {useMutation} from 'react-query';
import {CreateUserDto} from '@shared/dto';
import {ApiRoutes} from '@weddesign/enums';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';
import {AccessTokenDto} from '../../components/providers/UserProvider';

export type RegisterDto = {
    email: string;
    password: string;
    user: CreateUserDto;
};

export const useRegister = () => {
    const api = useUnauthorizedFetch();

    return useMutation(({email, password, user}: RegisterDto) => {
        return api.POST<AccessTokenDto, RegisterDto>(ApiRoutes.Register, {
            email,
            password,
            user,
        });
    });
};
