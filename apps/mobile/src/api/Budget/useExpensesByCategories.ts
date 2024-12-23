import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ExpensesByCategoryDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

export const useExpensesByCategories = () => {
    const api = useUnauthorizedFetch();

    return useQuery<ExpensesByCategoryDto[], Error>(
        [ApiRoutes.ExpensesByCategory],
        () =>
            api
                .GET<ExpensesByCategoryDto[]>(ApiRoutes.ExpensesByCategory)
                .then((response) => response),
    );
};
