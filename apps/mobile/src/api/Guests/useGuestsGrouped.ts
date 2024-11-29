import {useQuery} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {GuestDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

type guestsGroupedProps = {
    title: string;
    data: GuestDto[];
};

export const useGuestsGrouped = () => {
    const api = useUnauthorizedFetch();

    return useQuery<{title: string; data: GuestDto[]}[], Error>(
        [ApiRoutes.GuestsGrouped],
        () => api.GET<guestsGroupedProps[]>(ApiRoutes.GuestsGrouped),
    );
};
