import React, {useEffect, useState} from 'react';
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
} from '@weddesign/components';
import {useTranslation} from 'react-i18next';
import {Icons} from '@weddesign/assets';

import {useGuestsGrouped} from '../../../api/Guests/useGuestsGrouped';
import {useGuestsCount} from '../../../api/Guests/useGuestsCount';

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

    const {data: countCreated, isLoading: isLoadingCountCreated} = useGuestsCount({
        statusName: 'created',
    });
    const {data: countInvited, isLoading: isLoadingCountInvited} = useGuestsCount({
        statusName: 'invited',
    });
    const {data: countAccepted, isLoading: isLoadingCountAccepted} = useGuestsCount({
        statusName: 'accepted',
    });
    const {data: countRejected, isLoading: isLoadingCountRejected} = useGuestsCount({
        statusName: 'rejected',
    });
    const {data: countTotal, isLoading: isLoadingCountAll} = useGuestsCount();

    const {data: countChild, isLoading: isLoadingCountChild} = useGuestsCount({
        filter: 'isChild',
    });
    const {data: countOvernight, isLoading: isLoadingCountOvernight} =
        useGuestsCount({filter: 'overnight'});
    const {data: countVege, isLoading: isLoadingCountVege} = useGuestsCount({
        filter: 'isVege',
    });

    const {data: groupedGuests, isLoading: isLoadingGrouped} = useGuestsGrouped();

    useEffect(() => {
        if (!isLoadingCountChild) {
            console.log(countChild);
        }
    }, [countChild, isLoadingCountChild]);

    if (
        isLoadingCountCreated ||
        isLoadingCountInvited ||
        isLoadingCountAccepted ||
        isLoadingCountRejected ||
        isLoadingCountAll ||
        isLoadingCountChild ||
        isLoadingCountOvernight ||
        isLoadingCountVege ||
        isLoadingGrouped
    ) {
        return <Text style={{flex: 1, alignContent: 'center'}}>Loading...</Text>;
    }

    return (
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
                            <Counter count={countChild} label={t('counters.kid')} />
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
