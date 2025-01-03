import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {CategoryToSummaryDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

export const useProvidersCategoriesAll = () => {
    const api = useUnauthorizedFetch();

    return useQuery<CategoryToSummaryDto[], Error>(
        [ApiRoutes.ProvidersCategoriesAll],
        () => api.GET<CategoryToSummaryDto[]>(ApiRoutes.ProvidersCategoriesAll),
    );
};
