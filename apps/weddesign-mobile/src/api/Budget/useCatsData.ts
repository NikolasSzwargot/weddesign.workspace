import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {ExpenseCategoryDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useCatsData = () => {
    const api = useFetch();

    return useQuery<ExpenseCategoryDto[], Error>([ApiRoutes.CategoriesData], () =>
        api.GET<ExpenseCategoryDto[]>(ApiRoutes.CategoriesData),
    );
};
