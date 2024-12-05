import React, {useState} from 'react';
import {Keyboard, SectionList, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from '@weddesign/themes';
import {
    Counter,
    CustomOverlay,
    CustomSearchBar,
    CustomSectionHeader,
    GuestItem,
    GuestListBackgroundEllipse,
    GuestsStatusBar,
    Header,
    IconButton,
    LoadingSpinner,
} from '@weddesign/components';
import {useTranslation} from 'react-i18next';
import {Icons} from '@weddesign/assets';
import {Colors, GuestListRoutes} from '@weddesign/enums';
import {GuestDto} from '@shared/dto';

import {useDeleteGuest} from '../../../api/Guests/useDeleteGuest';
import {StatusChangeModal, WeddesignConfirmationModal} from '../../molecules';
import {useGuestsStatistics} from '../../../api/Guests/useGuestsStatistics';
import {useGuestsGrouped} from '../../../api/Guests/useGuestsGrouped';
import {useRouting} from '../../providers';

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
    const [isModalVisible, setModalVisible] = useState(false);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GuestDto | null>(null);
    const [confirmationModalText, setConfirmationModalText] = useState('');
    const {mutate: deleteGuest, isLoading: isDeleting} = useDeleteGuest();
    const {
        data: groupedGuests,
        isLoading: isLoadingGrouped,
        isError: isErrorGrouped,
        isFetching: isFetchingGrouped,
    } = useGuestsGrouped();
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
            {guestId: selectedItem.id},
            {
                onSuccess: () => {
                    console.log('Guest deleted successfully!');
                },
                onError: (error) => {
                    console.error('Error deleting guest:', error.message);
                },
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

    return (
        <Container>
            <GuestListBackgroundEllipse />
            <GuestListWrapper>
                <Header />
                {isLoading || isLoadingGrouped ? (
                    <LoadingSpinner
                        color={Colors.LightBlue}
                        msg={t('shared:spinnerMessage')}
                    />
                ) : isError || isErrorGrouped ? (
                    <Text.Regular style={{position: 'absolute', top: '50%'}}>
                        {/* @TODO przejście na ekran z błędem*/}
                        {/* eslint-disable-next-line react-native/no-raw-text */}
                        {'Tu będzie takie fajne przejście do ekranu błędu'}
                    </Text.Regular>
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
                                        onPress={() => console.log('clicked Filter')}
                                    />
                                    <IconButton
                                        Icon={Icons.AddGuest}
                                        onPress={() =>
                                            router.navigate(GuestListRoutes.ADD)
                                        }
                                    />
                                </SearchBarWrapper>
                            </View>
                        </TouchableWithoutFeedback>
                        <SectionList
                            sections={groupedGuests}
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
                            isVisible={isDeleting || isFetchingGrouped || isFetching}
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
                        ></StatusChangeModal>
                    </>
                )}
            </GuestListWrapper>
        </Container>
    );
};

export default GuestList;
