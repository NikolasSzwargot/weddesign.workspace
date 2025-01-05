import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {CreateProviderDto, ProviderDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

export const useCreateProvider = () => {
    const api = useUnauthorizedFetch();
    const queryClient = useQueryClient();

    return useMutation<ProviderDto, Error, CreateProviderDto>(
        (createProviderDto: CreateProviderDto) =>
            api.POST<ProviderDto, CreateProviderDto>(
                ApiRoutes.ProvidersCreate,
                createProviderDto,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.ProvidersCategoriesAll]);
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
