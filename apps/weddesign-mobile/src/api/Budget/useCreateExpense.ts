import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {CreateExpenseDto, ExpenseDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useCreateExpense = () => {
    const api = useFetch();
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
                console.error(
                    'An error occurred while creating the expense:',
                    error,
                );
            },
        },
    );
};
