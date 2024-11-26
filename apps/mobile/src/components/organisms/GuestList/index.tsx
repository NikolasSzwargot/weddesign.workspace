import React, {useState} from 'react';
import {
    SectionList,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    Text,
} from 'react-native';
import {
    Header,
    GuestListBackgroundEllipse,
    GuestItem,
    GuestsStatusBar,
    Counter,
    CustomSearchBar,
    IconButton,
    LoadingSpinner,
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
    LongSeparatorLine,
    SearchBarWrapper,
    SeparatorContainer,
    SeparatorText,
    ShortSeparatorLine,
    StatusBarWrapper,
} from './styles';

const renderSectionHeader = ({section: {title}}) => (
    <SeparatorContainer>
        <ShortSeparatorLine />
        <SeparatorText>{title}</SeparatorText>
        <LongSeparatorLine />
    </SeparatorContainer>
);

const GuestList = () => {
    const {t} = useTranslation('guestList');
    const [searchQuery, setSearchQuery] = useState('');

    const {
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
    } = useGuestsStatistics();

    const {
        data: groupedGuests,
        isLoading: isLoadingGrouped,
        isError: isErrorGrouped,
    } = useGuestsGrouped();

    return isLoading || isLoadingGrouped ? (
        <Container>
            <GuestListBackgroundEllipse />
            <GuestListWrapper>
                <Header />
                <LoadingSpinner
                    color={Colors.LightBlue}
                    msg={t('shared:spinnerMessage')}
                />
            </GuestListWrapper>
        </Container>
    ) : isError || isErrorGrouped ? (
        <Container>
            <GuestListBackgroundEllipse />
            <GuestListWrapper>
                <Header />
                <Text style={{position: 'absolute', top: '50%', fontSize: 20}}>
                    Tu będzie takie fajne przejście do ekranu błędu
                </Text>
            </GuestListWrapper>
        </Container>
    ) : (
        <Container>
            <GuestListBackgroundEllipse />
            <GuestListWrapper>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    accessible={false}
                >
                    <View>
                        <Header />

                        <StatusBarWrapper>
                            <GuestsStatusBar
                                created={countCreated}
                                invited={countInvited}
                                accepted={countAccepted}
                                rejected={countRejected}
                                totalGuests={countTotal}
                                confirmationText={t('statusBarText', {
                                    confirmed: countAccepted,
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
                            <Counter count={countVege} label={t('counters.vege')} />
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
                                onPress={() => console.log('clicked AddGuest')}
                            />
                        </SearchBarWrapper>
                    </View>
                </TouchableWithoutFeedback>
                <SectionList
                    sections={groupedGuests}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <GuestItem guest={item} />}
                    renderSectionHeader={renderSectionHeader}
                    showsVerticalScrollIndicator={true}
                />
            </GuestListWrapper>
        </Container>
    );
};

export default GuestList;
