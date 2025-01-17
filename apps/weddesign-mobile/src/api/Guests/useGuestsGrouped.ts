import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {GuestDto, GuestFiltersDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export type GuestsGroupedProps = {
    title: string;
    data: GuestDto[];
};

export const useGuestsGrouped = (filter: GuestFiltersDto) => {
    const api = useFetch();

    return useQuery<GuestsGroupedProps[], Error>([ApiRoutes.GuestsGrouped], () =>
        api.GET<GuestsGroupedProps[]>(ApiRoutes.GuestsGrouped, {params: filter}),
    );
};
