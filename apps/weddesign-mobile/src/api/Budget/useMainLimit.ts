import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {GetBudgetLimitsDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

export const useMainLimit = () => {
    const api = useUnauthorizedFetch();

    return useQuery<GetBudgetLimitsDto, Error>([ApiRoutes.MainLimitStats], () =>
        api.GET<GetBudgetLimitsDto>(ApiRoutes.MainLimitStats),
    );
};
