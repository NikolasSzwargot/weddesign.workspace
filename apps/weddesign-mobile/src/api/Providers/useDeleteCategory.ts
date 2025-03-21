import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ProviderCategoryDto} from '@shared/dto';

import {useFetch} from '../useFetch';

type deleteCategoryParams = {
    categoryId: number;
};

export const useDeleteCategory = () => {
    const api = useFetch();
    const queryClient = useQueryClient();
    const getProviderCategoryDeleteUrl = (id: number): ApiRoutes => {
        return ApiRoutes.ProvidersCategoriesDelete.replace(
            ':id',
            id.toString(),
        ) as ApiRoutes;
    };

    return useMutation<ProviderCategoryDto, Error, deleteCategoryParams>(
        ({categoryId}: deleteCategoryParams) => {
            if (!categoryId) {
                throw new Error('Category ID is required to delete category');
            }
            return api.DELETE<ProviderCategoryDto>(
                getProviderCategoryDeleteUrl(categoryId),
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.ProvidersCategories]);
            },
            onError: (error) => {
                console.error('Failed to delete category:', error.message);
            },
        },
    );
};
