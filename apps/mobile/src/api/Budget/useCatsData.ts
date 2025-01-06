import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ExpenseCategoryDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

export const useCatsData = () => {
    const api = useUnauthorizedFetch();

    return useQuery<ExpenseCategoryDto[], Error>([ApiRoutes.CategoriesData], () =>
        api.GET<ExpenseCategoryDto[]>(ApiRoutes.CategoriesData),
    );
};
