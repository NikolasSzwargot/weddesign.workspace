import React from 'react';
import {SectionList} from 'react-native';
import {Header, GuestListBackgroundEllipse, GuestItem} from '@weddesign/components';
import {guestsData} from '@mobile/mocks';
import {groupGuestsByFirstLetter} from '@weddesign/utils';

import {
    Container,
    GuestListWrapper,
    LongSeparatorLine,
    SeparatorContainer,
    SeparatorText,
    ShortSeparatorLine,
} from './styles';

const sections = groupGuestsByFirstLetter(guestsData);

const GuestList = () => {
    return (
        <Container>
            <GuestListBackgroundEllipse />
            <GuestListWrapper>
                <Header />
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
