import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {CategoryLimitDto, UpdateCategoryLimitDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useUpdateCategoryLimit = () => {
    const api = useFetch();
    const queryClient = useQueryClient();
    const getCategoryUpdateUrl = (id: number): ApiRoutes => {
        return ApiRoutes.CategoriesLimitsSingle.replace(
            ':categoryId',
            id.toString(),
        ) as ApiRoutes;
    };
    return useMutation<
        CategoryLimitDto,
        Error,
        {categoryId: number; updateCategoryLimitDto: UpdateCategoryLimitDto}
    >(
        ({categoryId, updateCategoryLimitDto}) =>
            api.PATCH<CategoryLimitDto, UpdateCategoryLimitDto>(
                getCategoryUpdateUrl(categoryId),
                updateCategoryLimitDto,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.CategoriesData]);
                queryClient.invalidateQueries([ApiRoutes.CategoriesLimits]);
            },
            onError: (error) => {
                console.error('Error updating limit:', error);
            },
        },
    );
};
