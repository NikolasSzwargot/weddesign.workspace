import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ProviderDto} from '@shared/dto';

import {useFetch} from '../useFetch';

type DeleteProviderParams = {
    providerId: number;
};

export const useDeleteProvider = () => {
    const api = useFetch();
    const queryClient = useQueryClient();
    const getProviderDeleteUrl = (id: number): ApiRoutes => {
        return ApiRoutes.ProvidersDelete.replace(':id', id.toString()) as ApiRoutes;
    };

    return useMutation<ProviderDto, Error, DeleteProviderParams>(
        ({providerId}: DeleteProviderParams) => {
            if (!providerId) {
                throw new Error('Provider ID is required to delete provider');
            }
            return api.DELETE<ProviderDto>(getProviderDeleteUrl(providerId));
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.ProvidersCategories]);
                queryClient.invalidateQueries([
                    ApiRoutes.ProvidersGroupedByStarsInCategory,
                ]);
            },
            onError: (error) => {
                console.error('Failed to delete provider:', error.message);
            },
        },
    );
};
