import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ProviderDto, UpdateProviderDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useUpdateProvider = () => {
    const api = useFetch();
    const queryClient = useQueryClient();
    const getProviderUpdateUrl = (id: number): ApiRoutes => {
        return ApiRoutes.ProvidersUpdate.replace(':id', id.toString()) as ApiRoutes;
    };

    return useMutation<
        ProviderDto,
        Error,
        {id: number; updateProviderDto: UpdateProviderDto}
    >(
        ({id, updateProviderDto}) =>
            api.PATCH<ProviderDto, UpdateProviderDto>(
                getProviderUpdateUrl(id),
                updateProviderDto,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.ProvidersCategoriesAll]);
                queryClient.invalidateQueries([
                    ApiRoutes.ProvidersGroupedByStarsInCategory,
                ]);
            },
            onError: (error) => {
                console.error('Error updating provider:', error);
            },
        },
    );
};
