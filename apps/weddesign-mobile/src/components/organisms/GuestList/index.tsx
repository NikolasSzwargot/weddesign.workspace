import React, {useEffect, useMemo, useState} from 'react';
import {Keyboard, SectionList, TouchableWithoutFeedback, View} from 'react-native';
import {
    BackgroundEllipse,
    Counter,
    CustomOverlay,
    CustomSearchBar,
    CustomSectionHeader,
    GuestItem,
    GuestsStatusBar,
    Header,
    IconButton,
    LoadingSpinner,
} from '@weddesign/components';
import {useTranslation} from 'react-i18next';
import {Icons} from '@weddesign/assets';
import {Colors, ErrorRoutes, GuestListRoutes, HomeRoutes} from '@weddesign/enums';
import {GuestDto, GuestFiltersDto} from '@shared/dto';
import {searchByQuery} from '@weddesign-mobile/utils';

import {useDeleteGuest} from '../../../api';
import {StatusChangeModal, WeddesignConfirmationModal} from '../../molecules';
import {useGuestsStatistics} from '../../../api';
import {useGuestsGrouped} from '../../../api';
import {useRouting} from '../../providers';
import {useUpdateGuest} from '../../../api';

import {
    Container,
    CounterWrapper,
    GuestListWrapper,
    SearchBarWrapper,
    StatusBarWrapper,
} from './styles';

const GuestList = () => {
    const {router} = useRouting();
    const {t} = useTranslation('guestList');
    const [searchQuery, setSearchQuery] = useState('');
    const [listData, setListData] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GuestDto | null>(null);
    const [confirmationModalText, setConfirmationModalText] = useState('');
    const {mutate: deleteGuest, isLoading: isDeleting} = useDeleteGuest();
    const {mutate: updateGuest, isLoading: isUpdating} = useUpdateGuest();

    const filter: GuestFiltersDto = router.location.state;
    const isFiltered = useMemo(() => {
        return filter
            ? !Object.values(filter).every((value) => value === undefined)
            : false;
    }, [filter]);

    const {
        data: groupedGuests,
        isLoading: isLoadingGrouped,
        isError: isErrorGrouped,
        isFetching: isFetchingGrouped,
    } = useGuestsGrouped(filter);
    const {
        countStatuses,
        countTotal,
        countChild,
        countOvernight,
        countVege,
        isLoading,
        isFetching,
        isError,
    } = useGuestsStatistics();

    const handleSuccess = () => {
        console.log('Success');
    };

    const handleError = () => {
        router.navigate(ErrorRoutes.GENERAL, 'guests');
    };

    const handleDelete = (guest: GuestDto) => {
        setSelectedItem(guest);
        setConfirmationModalText(
            t('deleteMessage', {
                firstName: guest.firstName,
                lastName: guest.lastName,
            }),
        );
        setModalVisible(!isModalVisible);
    };
    const handleYes = () => {
        setModalVisible(false);
        deleteGuest(
            {guestId: selectedItem?.id},
            {
                onSuccess: handleSuccess,
                onError: handleError,
            },
        );
    };
    const handleCancel = () => {
        setModalVisible(false);
        setStatusModalVisible(false);
    };

    const handleStatusChangeModal = (guest: GuestDto) => {
        setSelectedItem(guest);
        setStatusModalVisible(!isStatusModalVisible);
    };

    const handleStatusChange = (newGuestStatusId: number) => {
        setStatusModalVisible(false);
        updateGuest(
            {
                id: selectedItem?.id,
                updateGuestDto: {guestStatusId: newGuestStatusId},
            },
            {onSuccess: handleSuccess, onError: handleError},
        );
    };

    useEffect(() => {
        if (!isLoadingGrouped) {
            setListData(searchByQuery(groupedGuests, searchQuery));
        }
    }, [searchQuery, isLoadingGrouped, groupedGuests]);

    useEffect(() => {
        if (isError || isErrorGrouped) {
            router.navigate(ErrorRoutes.GENERAL, 'guests');
        }
    }, [isError, isErrorGrouped, router]);

    return (
        <Container>
            <BackgroundEllipse variant={'guests'} />
            <GuestListWrapper>
                <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                {isLoading || isLoadingGrouped ? (
                    <LoadingSpinner
                        color={Colors.LightBlue}
                        msg={t('shared:spinnerMessage')}
                    />
                ) : (
                    <>
                        <TouchableWithoutFeedback
                            onPress={Keyboard.dismiss}
                            accessible={false}
                        >
                            <View>
                                <StatusBarWrapper>
                                    <GuestsStatusBar
                                        statuses={countStatuses}
                                        totalGuests={countTotal}
                                        confirmationText={t('statusBarText', {
                                            confirmed: countStatuses.countAccepted,
                                            total: countTotal,
                                        })}
                                    />
                                </StatusBarWrapper>

                                <CounterWrapper>
                                    <Counter
                                        count={countChild}
                                        label={t('counters.child')}
                                    />
                                    <Counter
                                        count={countOvernight}
                                        label={t('counters.accommodation')}
                                    />
                                    <Counter
                                        count={countVege}
                                        label={t('counters.vege')}
                                    />
                                </CounterWrapper>

                                <SearchBarWrapper>
                                    <CustomSearchBar
                                        searchQuery={searchQuery}
                                        setSearchQuery={setSearchQuery}
                                        placeholder={t('searchPlaceholder')}
                                    />
                                    <IconButton
                                        Icon={Icons.Filter}
                                        fillColor={
                                            isFiltered
                                                ? Colors.LightBlue
                                                : Colors.WhiteSmokeDarker
                                        }
                                        onPress={() =>
                                            router.navigate(
                                                GuestListRoutes.FILTER,
                                                filter,
                                            )
                                        }
                                    />
                                    <IconButton
                                        Icon={Icons.AddPerson}
                                        fillColor={Colors.LightBlue}
                                        onPress={() =>
                                            router.navigate(GuestListRoutes.ADD)
                                        }
                                    />
                                </SearchBarWrapper>
                            </View>
                        </TouchableWithoutFeedback>
                        <SectionList
                            sections={listData}
                            initialNumToRender={20}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => (
                                <GuestItem
                                    guest={item}
                                    onStatusPress={handleStatusChangeModal}
                                    onGuestPress={() =>
                                        router.navigate(GuestListRoutes.ADD, item)
                                    }
                                    onDeletePress={handleDelete}
                                />
                            )}
                            renderSectionHeader={CustomSectionHeader}
                            showsVerticalScrollIndicator={true}
                        />
                        <CustomOverlay
                            isVisible={
                                isUpdating ||
                                isDeleting ||
                                isFetchingGrouped ||
                                isFetching
                            }
                            variant={'center'}
                        >
                            <LoadingSpinner
                                color={Colors.LightBlue}
                            ></LoadingSpinner>
                        </CustomOverlay>

                        <WeddesignConfirmationModal
                            isVisible={isModalVisible}
                            onBackdropPress={handleCancel}
                            onYesPress={handleYes}
                            onNoPress={handleCancel}
                            message={confirmationModalText}
                        ></WeddesignConfirmationModal>

                        <StatusChangeModal
                            isVisible={isStatusModalVisible}
                            onBackdropPress={handleCancel}
                            onStatusSelect={handleStatusChange}
                        ></StatusChangeModal>
                    </>
                )}
            </GuestListWrapper>
        </Container>
    );
};

export default GuestList;
