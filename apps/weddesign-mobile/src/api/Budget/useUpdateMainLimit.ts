import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {CategoryLimitDto, UpdateBudgetLimitDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useUpdateMainLimit = () => {
    const api = useFetch();
    const queryClient = useQueryClient();
    return useMutation<
        CategoryLimitDto,
        Error,
        {updateMainLimitDto: UpdateBudgetLimitDto}
    >(
        ({updateMainLimitDto}) =>
            api.PATCH<CategoryLimitDto, UpdateBudgetLimitDto>(
                ApiRoutes.MainLimitStats,
                updateMainLimitDto,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.MainLimitStats]);
            },
            onError: (error) => {
                console.error('Error updating main limit:', error);
            },
        },
    );
};
