import {useQuery} from 'react-query';
import {UserDto} from '@shared/dto';
import {ApiRoutes} from '@weddesign/enums';

import {useFetch} from '../useFetch';

export const useProfile = () => {
    const api = useFetch();

    return useQuery<UserDto, Error>([ApiRoutes.Profile], () =>
        api.GET<UserDto>(ApiRoutes.Profile),
    );
};
