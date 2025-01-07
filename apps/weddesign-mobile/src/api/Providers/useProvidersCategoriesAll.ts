import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {CategoryToSummaryDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useProvidersCategoriesAll = () => {
    const api = useFetch();

    return useQuery<CategoryToSummaryDto[], Error>(
        [ApiRoutes.ProvidersCategories],
        () => api.GET<CategoryToSummaryDto[]>(ApiRoutes.ProvidersCategories),
    );
};
