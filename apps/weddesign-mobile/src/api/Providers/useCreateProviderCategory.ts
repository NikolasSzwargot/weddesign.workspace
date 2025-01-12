import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {CreateProviderCategoryDto, ProviderCategoryDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useCreateProviderCategory = () => {
    const api = useFetch();
    const queryClient = useQueryClient();

    return useMutation<ProviderCategoryDto, Error, CreateProviderCategoryDto>(
        (createProviderCategoryDto: CreateProviderCategoryDto) =>
            api.POST<ProviderCategoryDto, CreateProviderCategoryDto>(
                ApiRoutes.ProvidersCategoryCreate,
                createProviderCategoryDto,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.ProvidersCategories]);
            },
            onError: (error) => {
                console.error('Error creating provider category:', error);
            },
        },
    );
};
