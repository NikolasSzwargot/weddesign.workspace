import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';

import {useFetch} from '../useFetch';

type LoginDto = {
    email: string;
    password: string;
};

export const useLogin = ({email, password}: LoginDto) => {
    const api = useFetch();

    return useQuery<boolean, Error>([ApiRoutes.Login, {email, password}], () =>
        api.POST<boolean, LoginDto>(ApiRoutes.Login, {email, password}),
    );
};
