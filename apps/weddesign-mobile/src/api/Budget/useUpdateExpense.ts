import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ExpenseDto, UpdateExpenseDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useUpdateExpense = () => {
    const api = useFetch();
    const queryClient = useQueryClient();
    const getExpenseUpdateUrl = (id: number): ApiRoutes => {
        return ApiRoutes.SingleExpense.replace(':id', id.toString()) as ApiRoutes;
    };

    return useMutation<
        ExpenseDto,
        Error,
        {id: number; updateExpenseDto: UpdateExpenseDto}
    >(
        ({id, updateExpenseDto}) =>
            api.PATCH<ExpenseDto, UpdateExpenseDto>(
                getExpenseUpdateUrl(id),
                updateExpenseDto,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.ExpensesByCategory]);
                queryClient.invalidateQueries([ApiRoutes.ExpensesByDate]);
                queryClient.invalidateQueries([ApiRoutes.MainLimitStats]);
            },
            onError: (error) => {
                console.error(
                    'An error occurred while updating the expense:',
                    error,
                );
            },
        },
    );
};
