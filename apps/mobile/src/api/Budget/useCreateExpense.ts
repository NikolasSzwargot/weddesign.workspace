import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {CreateExpenseDto, ExpenseDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

export const useCreateExpense = () => {
    const api = useUnauthorizedFetch();
    const queryClient = useQueryClient();

    return useMutation<ExpenseDto, Error, CreateExpenseDto>(
        (createExpenseDto: CreateExpenseDto) =>
            api.POST<ExpenseDto, CreateExpenseDto>(
                ApiRoutes.ExpenseCreate,
                createExpenseDto,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.ExpensesByCategory]);
                queryClient.invalidateQueries([ApiRoutes.ExpensesByDate]);
                queryClient.invalidateQueries([ApiRoutes.MainLimitStats]);
            },
            onError: (error) => {
                console.error('Error creating expense:', error);
            },
        },
    );
};
