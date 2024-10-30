import React, {useState} from 'react';
import {SectionList, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {
    Header,
    GuestListBackgroundEllipse,
    GuestItem,
    GuestsStatusBar,
    Counter,
    CustomSearchBar,
} from '@weddesign/components';
import {guestsData} from '@mobile/mocks';
import {groupGuestsByFirstLetter} from '@weddesign/utils';
import {useTranslation} from 'react-i18next';

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

const counterCounts = {
    1: guestsData.filter((guest) => guest.isChild === true).length,
    2: guestsData.filter((guest) => guest.nocleg === true).length,
    3: guestsData.filter((guest) => guest.isVege === true).length,
};

const GuestList = () => {
    const {t} = useTranslation('guestList');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredGuests = guestsData.filter((guest) =>
        `${guest.firstName} ${guest.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
    );

    const sections = groupGuestsByFirstLetter(filteredGuests);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <GuestListBackgroundEllipse />
                <GuestListWrapper>
                    <Header />

                    <StatusBarWrapper>
                        <GuestsStatusBar
                            guests={guestsData}
                            confirmationText={t('statusBarText', {
                                confirmed: guestsData.filter(
                                    (guest) => guest.statusId === 2,
                                ).length,
                                total: guestsData.length,
                            })}
                        />
                    </StatusBarWrapper>

                    <CounterWrapper>
                        <Counter
                            count={counterCounts[1]}
                            label={t('counters.kid')}
                        />
                        <Counter
                            count={counterCounts[2]}
                            label={t('counters.accommodation')}
                        />
                        <Counter
                            count={counterCounts[3]}
                            label={t('counters.vege')}
                        />
                    </CounterWrapper>

                    <SearchBarWrapper>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            placeholder={t('searchPlaceholder')}
                        />
                    </SearchBarWrapper>

                    <SectionList
                        sections={sections}
                        keyExtractor={(item) => item.firstName}
                        renderItem={({item}) => <GuestItem guest={item} />}
                        renderSectionHeader={({section: {title}}) => (
                            <SeparatorContainer>
                                <ShortSeparatorLine />
                                <SeparatorText>{title}</SeparatorText>
                                <LongSeparatorLine />
                            </SeparatorContainer>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </GuestListWrapper>
            </Container>
        </TouchableWithoutFeedback>
    );
};

export default GuestList;
