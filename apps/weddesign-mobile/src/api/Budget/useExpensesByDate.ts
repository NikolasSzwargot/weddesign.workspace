import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ExpensesByDateDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useExpensesByDate = () => {
    const api = useFetch();

    return useQuery<ExpensesByDateDto[], Error>([ApiRoutes.ExpensesByDate], () =>
        api
            .GET<ExpensesByDateDto[]>(ApiRoutes.ExpensesByDate)
            .then((response) => response),
    );
};
