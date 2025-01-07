import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ProviderDto} from '@shared/dto';

import {useFetch} from '../useFetch';

type providersByStarsProps = {
    title: string;
    data: ProviderDto[];
};

export const useProvidersByStarsInCategory = (categoryId: number) => {
    const api = useFetch();

    return useQuery<providersByStarsProps[], Error>(
        [ApiRoutes.ProvidersGroupedByStarsInCategory],
        () =>
            api.GET<providersByStarsProps[]>(
                ApiRoutes.ProvidersGroupedByStarsInCategory,
                {params: {categoryId: categoryId}},
            ),
    );
};
