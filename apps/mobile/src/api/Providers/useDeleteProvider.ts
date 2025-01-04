import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ProviderDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

type DeleteProviderParams = {
    providerId: number;
};

export const useDeleteProvider = () => {
    const api = useUnauthorizedFetch();
    const queryClient = useQueryClient();

    return useMutation<ProviderDto, Error, DeleteProviderParams>(
        ({providerId}: DeleteProviderParams) => {
            if (!providerId) {
                throw new Error('Guest ID is required to delete a guest');
            }
            return api.DELETE<ProviderDto>(ApiRoutes.ProvidersDelete, {
                params: {id: providerId},
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.ProvidersCategoriesAll]);
                queryClient.invalidateQueries([
                    ApiRoutes.ProvidersGroupedByStarsInCategory,
                ]);
            },
            onError: (error) => {
                console.error('Failed to delete guest:', error.message);
            },
        },
    );
};
