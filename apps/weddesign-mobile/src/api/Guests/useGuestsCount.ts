import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';

import {useFetch} from '../useFetch';

type UseGuestCountParams = {
    filter?: string;
    statusName?: string;
    statusId?: number;
};

type result = {
    count: number;
};

export const useGuestsCount = (params?: UseGuestCountParams) => {
    const api = useFetch();

    return useQuery<number, Error>([ApiRoutes.GuestsCount, params], () => {
        return api
            .GET<result>(ApiRoutes.GuestsCount, {
                params: params,
            })
            .then((response) => response.count);
    });
};
