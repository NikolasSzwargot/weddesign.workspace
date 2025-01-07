import {useMutation, useQueryClient} from 'react-query';
import {ApiRoutes} from '@weddesign/enums';
import {GuestDto, UpdateGuestDto} from '@shared/dto';

import {useFetch} from '../useFetch';

export const useUpdateGuest = () => {
    const api = useFetch();
    const queryClient = useQueryClient();
    const getGuestsUpdateUrl = (id: number): ApiRoutes => {
        return ApiRoutes.GuestsUpdate.replace(':id', id.toString()) as ApiRoutes;
    };

    return useMutation<
        GuestDto,
        Error,
        {id: number; updateGuestDto: UpdateGuestDto}
    >(
        ({id, updateGuestDto}) =>
            api.PATCH<GuestDto, UpdateGuestDto>(
                getGuestsUpdateUrl(id),
                updateGuestDto,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([ApiRoutes.GuestsGrouped]);
                queryClient.invalidateQueries([ApiRoutes.GuestsCount]);
            },
            onError: (error) => {
                console.error('Error updating guest:', error);
            },
        },
    );
};
