import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {CategoryLimitDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useCategoriesLimits = () => {
    const api = useFetch();

    return useQuery<CategoryLimitDto[], Error>([ApiRoutes.CategoriesLimits], () =>
        api.GET<CategoryLimitDto[]>(ApiRoutes.CategoriesLimits),
    );
};
