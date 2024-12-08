import {GuestsCountParams, GuestStatuses} from '@weddesign/enums';
import {Statuses} from '@weddesign/types';

import {useGuestsCount} from './useGuestsCount';

export const useGuestsStatistics = () => {
    const {
        data: countCreated,
        isLoading: isLoadingCountCreated,
        isError: isErrorCountCreated,
        isFetching: isFetchingCountCreated,
    } = useGuestsCount({
        statusId: GuestStatuses.Created,
    });
    const {
        data: countInvited,
        isLoading: isLoadingCountInvited,
        isError: isErrorCountInvited,
        isFetching: isFetchingCountInvited,
    } = useGuestsCount({
        statusId: GuestStatuses.Invited,
    });
    const {
        data: countAccepted,
        isLoading: isLoadingCountAccepted,
        isError: isErrorCountAccepted,
        isFetching: isFetchingCountAccepted,
    } = useGuestsCount({
        statusId: GuestStatuses.Accepted,
    });
    const {
        data: countRejected,
        isLoading: isLoadingCountRejected,
        isError: isErrorCountRejected,
        isFetching: isFetchingCountRejected,
    } = useGuestsCount({
        statusId: GuestStatuses.Rejected,
    });
    const {
        data: countTotal,
        isLoading: isLoadingCountAll,
        isError: isErrorCountAll,
        isFetching: isFetchingCountAll,
    } = useGuestsCount();

    const {
        data: countChild,
        isLoading: isLoadingCountChild,
        isError: isErrorCountChild,
        isFetching: isFetchingCountChild,
    } = useGuestsCount({
        filter: GuestsCountParams.IsChild,
    });
    const {
        data: countOvernight,
        isLoading: isLoadingCountOvernight,
        isError: isErrorCountOvernight,
        isFetching: isFetchingCountOvernight,
    } = useGuestsCount({filter: GuestsCountParams.Overnight});
    const {
        data: countVege,
        isLoading: isLoadingCountVege,
        isError: isErrorCountVege,
        isFetching: isFetchingCountVege,
    } = useGuestsCount({
        filter: GuestsCountParams.IsVege,
    });

    const isLoading =
        isLoadingCountCreated ||
        isLoadingCountInvited ||
        isLoadingCountAccepted ||
        isLoadingCountRejected ||
        isLoadingCountAll ||
        isLoadingCountChild ||
        isLoadingCountOvernight ||
        isLoadingCountVege;

    const isError =
        isErrorCountCreated ||
        isErrorCountInvited ||
        isErrorCountAccepted ||
        isErrorCountRejected ||
        isErrorCountAll ||
        isErrorCountChild ||
        isErrorCountOvernight ||
        isErrorCountVege;

    const isFetching =
        isFetchingCountCreated ||
        isFetchingCountInvited ||
        isFetchingCountAccepted ||
        isFetchingCountRejected ||
        isFetchingCountAll ||
        isFetchingCountChild ||
        isFetchingCountOvernight ||
        isFetchingCountVege;

    const countStatuses: Statuses = {
        countCreated,
        countInvited,
        countAccepted,
        countRejected,
    };
    return {
        countStatuses,
        countTotal,
        countChild,
        countOvernight,
        countVege,
        isLoading,
        isFetching,
        isError,
    };
};
