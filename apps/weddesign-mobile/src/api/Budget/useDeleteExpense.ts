import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ExpenseDto} from '@shared/dto';

import {useFetch} from '../useFetch';

type DeleteExpenseParams = {
    expenseId: number;
};

export const useDeleteExpense = () => {
    const api = useFetch();
    const queryClient = useQueryClient();
    const getExpenseDeleteUrl = (id: number): ApiRoutes => {
        return ApiRoutes.SingleExpense.replace(':id', id.toString()) as ApiRoutes;
    };

    return useMutation<ExpenseDto, Error, DeleteExpenseParams>(
        ({expenseId}: DeleteExpenseParams) => {
            if (!expenseId) {
                throw new Error('Expense ID is required to delete a expense');
            }
            return api.DELETE<ExpenseDto>(getExpenseDeleteUrl(expenseId));
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.ExpensesByCategory]);
                queryClient.invalidateQueries([ApiRoutes.ExpensesByCategory]);
                queryClient.invalidateQueries([ApiRoutes.MainLimitStats]);
            },
            onError: (error) => {
                console.error('Failed to delete expense:', error.message);
            },
        },
    );
};
