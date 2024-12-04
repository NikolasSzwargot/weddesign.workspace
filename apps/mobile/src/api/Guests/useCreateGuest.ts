import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {CreateGuestDto, GuestDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

export const useCreateGuest = () => {
    const api = useUnauthorizedFetch();
    const queryClient = useQueryClient();

    return useMutation<GuestDto, Error, CreateGuestDto>(
        (createGuestDto: CreateGuestDto) =>
            api.POST<GuestDto, CreateGuestDto>(
                ApiRoutes.GuestsCreate,
                createGuestDto,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.GuestsGrouped]);
                queryClient.invalidateQueries([ApiRoutes.GuestsCount]);
            },
            onError: (error) => {
                console.error('Error creating guest:', error);
            },
        },
    );
};
