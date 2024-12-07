import React, {useEffect, useRef, useState} from 'react';
import {Animated, SectionList} from 'react-native';
import {
    BudgetFrame,
    CustomSectionHeader,
    DudgetEllipse,
    CustomSearchBar,
    IconButton,
    ExpenseItem,
    Header,
    LoadingSpinner,
    BudgetStatusBar,
} from '@weddesign/components';
import {Colors} from '@weddesign/enums';
import {useTranslation} from 'react-i18next';
import {Icons} from '@weddesign/assets';
import {getBudgetCategoryData} from '@mobile/utils';
import {Text} from '@weddesign/themes';

import {useExpensesByCats} from '../../../api/Budget/useExpensesByCats';
import {useExpensesByDate} from '../../../api/Budget/useExpensesByDate';
import {useMainLimit} from '../../../api/Budget/useMainLimit';

import {
    Container,
    BudgetMainWrapper,
    BudgetMainFrame,
    InfoTextWrapper,
    SearchBarWrapper,
} from './styles';

const BudgetMain = () => {
    const {t} = useTranslation('budget');
    const [searchQuery, setSearchQuery] = useState('');
    const [groupingMode, setGroupingMode] = useState<'cats' | 'date'>('cats');
    const [listData, setListData] = useState([]);

    // POBIERANIE  // TODO: dane są wrzucane do listy jeszcze przed pobraniem jakimś cudem
    const {
        data: mainLimitData,
        isLoading: isLoadingMainLimit,
        isError: isErrorMainLimit,
        isFetching: isFetchingMainLimit,
    } = useMainLimit();
    const {
        data: groupedByCats,
        isLoading: isLoadingByCats,
        isError: isErrorByCats,
        isFetching: isFetchingByCats,
    } = useExpensesByCats();
    const {
        data: groupedByDate,
        isLoading: isLoadingByDate,
        isError: isErrorByDate,
        isFetching: isFetchingByDate,
    } = useExpensesByDate();

    useEffect(() => {
        if (!isFetchingByDate && !isFetchingByCats) {
            setListData(groupingMode === 'cats' ? groupedByCats : groupedByDate);
            console.log('lissta', listData);
        }
    }, [groupingMode, groupedByCats, groupedByDate]);

    const scrollY = useRef(new Animated.Value(0)).current;
    const infoTextAnimation = {
        color: scrollY.interpolate({
            inputRange: [0, 120],
            outputRange: [Colors.TextGrey, '#00000000'],
            extrapolate: 'clamp',
        }),
        margin: scrollY.interpolate({
            inputRange: [0, 150],
            outputRange: [14, 0],
            extrapolate: 'clamp',
        }),
    };

    const price = {
        total: 21370000,
        paid: 100,
        nPaid: 320000,
    };

    useEffect(() => {
        if (!isFetchingByDate && !isFetchingByCats) {
            console.log(groupedByCats);
        }
    }, [groupedByCats]);
    useEffect(() => {
        if (!isFetchingMainLimit) {
            console.log(mainLimitData);
        }
    }, [mainLimitData]);
    useEffect(() => {
        if (!isFetchingByDate) {
            console.log(groupedByDate);
        }
    }, [groupedByDate]);

    const translateData = (lista) => {
        return groupingMode === 'cats'
            ? lista.map((item) => ({
                  ...item,
                  title: t(`category.${item.title}`),
              }))
            : lista;
    };

    const content =
        isLoadingMainLimit || isLoadingByCats || isLoadingByDate ? (
            <>
                <DudgetEllipse />
                <LoadingSpinner color={Colors.LightGreen} msg={t('loading')} />
            </>
        ) : isErrorByCats || isErrorMainLimit || isErrorByDate ? (
            <Text.Regular style={{position: 'absolute', top: '50%'}}>
                {/* @TODO przejście na ekran z błędem*/}
                {/* eslint-disable-next-line react-native/no-raw-text */}
                {'Tu będzie takie fajne przejście do ekranu błędu'}
            </Text.Regular>
        ) : (
            <>
                <DudgetEllipse />
                <BudgetMainWrapper>
                    <Header />
                    <BudgetMainFrame
                        onLongPress={() => console.log('odpalaj edycje kategorii')}
                        activeOpacity={0.5}
                    >
                        <BudgetFrame
                            current={mainLimitData.totalPlanned}
                            total={mainLimitData.limit}
                            currency={t('currency')}
                            scrollData={scrollY}
                        />
                        <BudgetStatusBar
                            limit={mainLimitData.limit}
                            notPaid={mainLimitData.notPaid}
                            paid={mainLimitData.paid}
                            totalPlanned={mainLimitData.totalPlanned}
                        />
                    </BudgetMainFrame>
                    <InfoTextWrapper>
                        <Animated.Text
                            style={[
                                infoTextAnimation,
                                {
                                    fontSize: 14,
                                    fontWeight: 500,
                                    textAlign: 'center',
                                },
                            ]}
                        >{`${t('mainProgressbarText', {
                            percent: Math.round(
                                (mainLimitData.totalPlanned / mainLimitData.limit) *
                                    100,
                            ),
                        })}`}</Animated.Text>
                    </InfoTextWrapper>

                    <SearchBarWrapper>
                        <CustomSearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            placeholder={t('searchPlaceholder')}
                        />
                        <IconButton
                            Icon={
                                groupingMode === 'cats'
                                    ? Icons.FilterDate
                                    : Icons.Car
                                //   TODO: podmienic na lepszą ikonke niż samochów
                            }
                            onPress={() => {
                                setGroupingMode(
                                    groupingMode === 'cats' ? 'date' : 'cats',
                                );
                                console.log(`mode set to ${groupingMode}`);
                            }}
                            fillColor={Colors.ButtonGray}
                        />
                        <IconButton
                            Icon={Icons.Plus}
                            onPress={() => console.log('clicked AddGuest')}
                            fillColor={Colors.LightGreen}
                        />
                    </SearchBarWrapper>

                    <SectionList
                        // sections={groupedExpensesL}
                        // sections={listData}
                        sections={translateData(listData)}
                        initialNumToRender={20}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <ExpenseItem
                                expName={item.name}
                                expAmount={item.amount}
                                currency={t('currency')}
                                catData={getBudgetCategoryData(item.categoryId)}
                            />
                        )}
                        renderSectionHeader={CustomSectionHeader}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: scrollY}}}],
                            {useNativeDriver: false},
                        )}
                        showsVerticalScrollIndicator={true}
                    />
                </BudgetMainWrapper>
            </>
        );

    return <Container>{content}</Container>;
};

export default BudgetMain;
