import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

type UseGuestCountParams = {
    filter?: string;
    statusName?: string;
    statusId?: number;
};

type result = {
    count: number;
};

export const useGuestsCount = (params?: UseGuestCountParams) => {
    const api = useUnauthorizedFetch();

    return useQuery<number, Error>([ApiRoutes.GuestsCount, params], () => {
        return api
            .GET<result>(ApiRoutes.GuestsCount, {
                params: params,
            })
            .then((response) => response.count);
    });
};
