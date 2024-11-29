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

import {useGuestsGrouped} from '../../../api/Guests/useGuestsGrouped';
import {useGuestsStatistics} from '../../../api/Guests/useGuestsStatistics';

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
                            renderItem={({item}) => <GuestItem guest={item} />}
                            renderSectionHeader={CustomSectionHeader}
                            showsVerticalScrollIndicator={true}
                        />
                    </>
                )}
            </GuestListWrapper>
        </Container>
    );
};

export default GuestList;
