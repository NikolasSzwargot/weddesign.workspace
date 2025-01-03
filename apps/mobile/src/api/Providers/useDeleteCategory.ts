import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ProviderCategoryDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

type deleteCategoryParams = {
    categoryId: number;
};

export const useDeleteCategory = () => {
    const api = useUnauthorizedFetch();
    const queryClient = useQueryClient();

    return useMutation<ProviderCategoryDto, Error, deleteCategoryParams>(
        ({categoryId}: deleteCategoryParams) => {
            if (!categoryId) {
                throw new Error('Category ID is required to delete category');
            }
            return api.DELETE<ProviderCategoryDto>(
                ApiRoutes.ProvidersCategoriesDelete,
                {
                    params: {id: categoryId},
                },
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.ProvidersCategoriesAll]);
            },
            onError: (error) => {
                console.error('Failed to delete guest:', error.message);
            },
        },
    );
};
