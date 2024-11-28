import {GuestsCountParams, GuestStatuses} from '@weddesign/enums';

import {useGuestsCount} from './useGuestsCount';

export const useGuestsStatistics = () => {
    const {
        data: countCreated,
        isLoading: isLoadingCountCreated,
        isError: isErrorCountCreated,
    } = useGuestsCount({
        statusId: GuestStatuses.Created,
    });
    const {
        data: countInvited,
        isLoading: isLoadingCountInvited,
        isError: isErrorCountInvited,
    } = useGuestsCount({
        statusId: GuestStatuses.Invited,
    });
    const {
        data: countAccepted,
        isLoading: isLoadingCountAccepted,
        isError: isErrorCountAccepted,
    } = useGuestsCount({
        statusId: GuestStatuses.Accepted,
    });
    const {
        data: countRejected,
        isLoading: isLoadingCountRejected,
        isError: isErrorCountRejected,
    } = useGuestsCount({
        statusId: GuestStatuses.Rejected,
    });
    const {
        data: countTotal,
        isLoading: isLoadingCountAll,
        isError: isErrorCountAll,
    } = useGuestsCount();

    const {
        data: countChild,
        isLoading: isLoadingCountChild,
        isError: isErrorCountChild,
    } = useGuestsCount({
        filter: GuestsCountParams.IsChild,
    });
    const {
        data: countOvernight,
        isLoading: isLoadingCountOvernight,
        isError: isErrorCountOvernight,
    } = useGuestsCount({filter: GuestsCountParams.Overnight});
    const {
        data: countVege,
        isLoading: isLoadingCountVege,
        isError: isErrorCountVege,
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

    return {
        countCreated,
        countInvited,
        countAccepted,
        countRejected,
        countTotal,
        countChild,
        countOvernight,
        countVege,
        isLoading,
        isError,
    };
};
