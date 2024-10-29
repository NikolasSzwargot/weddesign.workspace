import React from 'react';
import {SectionList} from 'react-native';
import {
    Header,
    GuestListBackgroundEllipse,
    GuestItem,
    GuestsStatusBar,
    Counter,
} from '@weddesign/components';
import {guestsData} from '@mobile/mocks';
import {groupGuestsByFirstLetter} from '@weddesign/utils';

import {
    Container,
    CounterWrapper,
    GuestListWrapper,
    LongSeparatorLine,
    SeparatorContainer,
    SeparatorText,
    ShortSeparatorLine,
    StatusBarWrapper,
} from './styles';

const sections = groupGuestsByFirstLetter(guestsData);

const counterCounts = {
    1: guestsData.filter((guest) => guest.isChild === true).length,
    2: guestsData.filter((guest) => guest.nocleg === true).length,
    3: guestsData.filter((guest) => guest.isVege === true).length,
};

const GuestList = () => {
    return (
        <Container>
            <GuestListBackgroundEllipse />
            <GuestListWrapper>
                <Header />

                <StatusBarWrapper>
                    <GuestsStatusBar guests={guestsData} />
                </StatusBarWrapper>

                <CounterWrapper>
                    <Counter count={counterCounts[1]} label="dzieci" />
                    <Counter count={counterCounts[2]} label="noclegi" />
                    <Counter count={counterCounts[3]} label="wege" />
                </CounterWrapper>

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
    );
};

export default GuestList;
