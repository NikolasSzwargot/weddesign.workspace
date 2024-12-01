import React, {useState} from 'react';
import {SectionList, TouchableWithoutFeedback, Keyboard, View} from 'react-native';
import {Text} from '@weddesign/themes';
import {
    Header,
    GuestListBackgroundEllipse,
    GuestItem,
    GuestsStatusBar,
    Counter,
    CustomSearchBar,
    IconButton,
    LoadingSpinner,
    CustomSectionHeader,
} from '@weddesign/components';
import {useTranslation} from 'react-i18next';
import {Icons} from '@weddesign/assets';
import {Colors} from '@weddesign/enums';
import {GuestDto} from '@shared/dto';

import {useGuestsGrouped} from '../../../api/Guests/useGuestsGrouped';
import {useGuestsStatistics} from '../../../api/Guests/useGuestsStatistics';
import {useDeleteGuest} from '../../../api/Guests/useDeleteGuest';
import {WeddesignConfirmationModal} from '../../molecules';

import {
    Container,
    CounterWrapper,
    GuestListWrapper,
    SearchBarWrapper,
    StatusBarWrapper,
} from './styles';

const GuestList = () => {
    const {t} = useTranslation('guestList');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GuestDto | null>(null);
    const {mutate: deleteGuest, isLoading: isDeleting} = useDeleteGuest();

    const handleDelete = (guest: GuestDto) => {
        setSelectedItem(guest);
        setModalVisible(!isModalVisible);
    };
    const handleYes = () => {
        setModalVisible(false);
        console.log(`Deleting ${selectedItem.firstName}`);
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
        console.log('Canceled');
    };

    const {
        countStatuses,
        countTotal,
        countChild,
        countOvernight,
        countVege,
        isLoading,
        isError,
    } = useGuestsStatistics();

    const {
        data: groupedGuests,
        isLoading: isLoadingGrouped,
        isError: isErrorGrouped,
    } = useGuestsGrouped();

    return (
        <Container>
            <GuestListBackgroundEllipse />
            <GuestListWrapper>
                <Header />
                {isLoading || isLoadingGrouped || isDeleting ? (
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
                                            console.log('clicked AddGuest')
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
                                    onDeletePress={handleDelete}
                                />
                            )}
                            renderSectionHeader={CustomSectionHeader}
                            showsVerticalScrollIndicator={true}
                        />

                        <WeddesignConfirmationModal
                            isVisible={isModalVisible}
                            onBackdropPress={handleCancel}
                            onYesPress={handleYes}
                            onNoPress={handleCancel}
                        ></WeddesignConfirmationModal>
                    </>
                )}
            </GuestListWrapper>
        </Container>
    );
};

export default GuestList;
