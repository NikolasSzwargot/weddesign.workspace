import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {GuestDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

type GuestsGroupedProps = {
    title: string;
    data: GuestDto[];
};

export const useGuestsGrouped = () => {
    const api = useUnauthorizedFetch();

    return useQuery<GuestsGroupedProps[], Error>([ApiRoutes.GuestsGrouped], () =>
        api.GET<GuestsGroupedProps[]>(ApiRoutes.GuestsGrouped),
    );
};
