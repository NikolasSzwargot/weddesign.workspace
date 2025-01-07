import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {CreateProviderDto, ProviderDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useCreateProvider = () => {
    const api = useFetch();
    const queryClient = useQueryClient();

    return useMutation<ProviderDto, Error, CreateProviderDto>(
        (createProviderDto: CreateProviderDto) =>
            api.POST<ProviderDto, CreateProviderDto>(
                ApiRoutes.ProvidersCreate,
                createProviderDto,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.ProvidersCategories]);
                queryClient.invalidateQueries([
                    ApiRoutes.ProvidersGroupedByStarsInCategory,
                ]);
            },
            onError: (error) => {
                console.error('Error creating provider:', error);
            },
        },
    );
};
