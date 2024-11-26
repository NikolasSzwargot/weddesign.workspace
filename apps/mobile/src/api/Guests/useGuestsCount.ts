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
        const queryParams: Record<string, string | number> = {};

        if (params?.filter) {
            queryParams.filter = params.filter;
        }
        if (params?.statusName) {
            queryParams.statusName = params.statusName;
        }
        if (params?.statusId) {
            queryParams.statusId = params.statusId;
        }

        return api
            .GET<result>(ApiRoutes.GuestsCount, {
                params: queryParams,
            })
            .then((response) => response.count);
    });
};
