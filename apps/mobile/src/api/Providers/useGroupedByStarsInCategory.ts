import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ProviderDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

type providersByStarsProps = {
    title: string;
    data: ProviderDto[];
};

export const useProvidersByStarsInCategory = (categoryId: number) => {
    const api = useUnauthorizedFetch();

    return useQuery<providersByStarsProps[], Error>(
        [ApiRoutes.ProvidersGroupedByStarsInCategory],
        () =>
            api.GET<providersByStarsProps[]>(
                ApiRoutes.ProvidersGroupedByStarsInCategory,
                {params: {categoryId: categoryId}},
            ),
    );
};
