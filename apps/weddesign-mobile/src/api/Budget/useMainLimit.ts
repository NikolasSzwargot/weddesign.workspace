import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {GetBudgetLimitsDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useMainLimit = () => {
    const api = useFetch();

    return useQuery<GetBudgetLimitsDto, Error>([ApiRoutes.MainLimitStats], () =>
        api.GET<GetBudgetLimitsDto>(ApiRoutes.MainLimitStats),
    );
};
