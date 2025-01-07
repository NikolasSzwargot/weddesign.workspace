import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ExpensesByCategoryDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useExpensesByCategories = () => {
    const api = useFetch();

    return useQuery<ExpensesByCategoryDto[], Error>(
        [ApiRoutes.ExpensesByCategory],
        () =>
            api
                .GET<ExpensesByCategoryDto[]>(ApiRoutes.ExpensesByCategory)
                .then((response) => response),
    );
};
