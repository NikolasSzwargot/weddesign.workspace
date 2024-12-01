import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {GuestDto} from '@shared/dto';

import {useUnauthorizedFetch} from '../useUnauthorizedFetch';

type DeleteGuestParams = {
    guestId: number;
};

export const useDeleteGuest = () => {
    const api = useUnauthorizedFetch(); // Use your fetchWrapper
    const queryClient = useQueryClient();

    return useMutation<GuestDto, Error, DeleteGuestParams>(
        ({guestId}: DeleteGuestParams) => {
            if (!guestId) {
                throw new Error('Guest ID is required to delete a guest');
            }
            return api.DELETE<GuestDto>(ApiRoutes.GuestsDelete, {
                params: {id: guestId},
            });
        },
        {
            onSuccess: () => {
                // Invalidate queries related to guests to refresh data
                queryClient.invalidateQueries([ApiRoutes.GuestsGrouped]);
                queryClient.invalidateQueries([ApiRoutes.GuestsCount]);
            },
            onError: (error) => {
                console.error('Failed to delete guest:', error.message);
            },
        },
    );
};
