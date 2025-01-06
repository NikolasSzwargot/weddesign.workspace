import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ExpensesByDateDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

export const useExpensesByDate = () => {
    const api = useUnauthorizedFetch();

    return useQuery<ExpensesByDateDto[], Error>([ApiRoutes.ExpensesByDate], () =>
        api
            .GET<ExpensesByDateDto[]>(ApiRoutes.ExpensesByDate)
            .then((response) => response),
    );
};
