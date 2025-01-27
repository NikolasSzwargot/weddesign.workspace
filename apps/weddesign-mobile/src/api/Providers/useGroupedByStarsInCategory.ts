import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ProviderDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export type ProvidersByStarsProps = {
    title: string;
    data: ProviderDto[];
};

export const useProvidersByStarsInCategory = (categoryId: number) => {
    const api = useFetch();
    const getProvidersGroupedByStarsUrl = (id: number): ApiRoutes => {
        return ApiRoutes.ProvidersGroupedByStarsInCategory.replace(
            ':categoryId',
            id.toString(),
        ) as ApiRoutes;
    };

    return useQuery<ProvidersByStarsProps[], Error>(
        [ApiRoutes.ProvidersGroupedByStarsInCategory],
        () =>
            api.GET<ProvidersByStarsProps[]>(
                getProvidersGroupedByStarsUrl(categoryId),
            ),
    );
};
