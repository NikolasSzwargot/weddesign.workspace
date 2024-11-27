import {GuestsCountParams} from '@weddesign/enums';

import {useGuestsCount} from './useGuestsCount';

export const useGuestsStatistics = () => {
    const {
        data: countCreated,
        isLoading: isLoadingCountCreated,
        isError: isErrorCountCreated,
    } = useGuestsCount({
        statusName: GuestsCountParams.StatusCreated,
    });
    const {
        data: countInvited,
        isLoading: isLoadingCountInvited,
        isError: isErrorCountInvited,
    } = useGuestsCount({
        statusName: GuestsCountParams.StatusInvited,
    });
    const {
        data: countAccepted,
        isLoading: isLoadingCountAccepted,
        isError: isErrorCountAccepted,
    } = useGuestsCount({
        statusName: GuestsCountParams.StatusAccepted,
    });
    const {
        data: countRejected,
        isLoading: isLoadingCountRejected,
        isError: isErrorCountRejected,
    } = useGuestsCount({
        statusName: GuestsCountParams.StatusRejected,
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
