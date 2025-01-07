import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {GuestDto} from '@shared/dto';

import {useFetch} from '../useFetch';

type DeleteGuestParams = {
    guestId: number;
};

export const useDeleteGuest = () => {
    const api = useFetch();
    const queryClient = useQueryClient();
    const getGuestsDeleteUrl = (id: number): ApiRoutes => {
        return ApiRoutes.GuestsDelete.replace(':id', id.toString()) as ApiRoutes;
    };

    return useMutation<GuestDto, Error, DeleteGuestParams>(
        ({guestId}: DeleteGuestParams) => {
            if (!guestId) {
                throw new Error('Guest ID is required to delete a guest');
            }
            return api.DELETE<GuestDto>(getGuestsDeleteUrl(guestId));
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.GuestsGrouped]);
                queryClient.invalidateQueries([ApiRoutes.GuestsCount]);
            },
            onError: (error) => {
                console.error('Failed to delete guest:', error.message);
            },
        },
    );
};
