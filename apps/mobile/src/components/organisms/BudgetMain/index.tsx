import React, {useEffect, useRef, useState} from 'react';
import {Animated, SectionList} from 'react-native';
import {
    BudgetFrame,
    CustomSectionHeader,
    BudgetEllipse,
    CustomSearchBar,
    IconButton,
    ExpenseItem,
    Header,
    LoadingSpinner,
    BudgetStatusBar,
} from '@weddesign/components';
import {Colors, ExpenseGroupingMode} from '@weddesign/enums';
import {useTranslation} from 'react-i18next';
import {Icons} from '@weddesign/assets';
import {getBudgetCategoryData} from '@mobile/utils';
import {Text} from '@weddesign/themes';

import {useExpensesByCategories} from '../../../api/Budget/useExpensesByCategories';
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
    const [groupingMode, setGroupingMode] = useState<
        ExpenseGroupingMode.Categories | ExpenseGroupingMode.Dates
    >(ExpenseGroupingMode.Categories);
    const [listData, setListData] = useState([]);

    const {
        data: mainLimitData,
        isLoading: isLoadingMainLimit,
        isError: isErrorMainLimit,
        isFetching: isFetchingMainLimit,
    } = useMainLimit();
    const {
        data: groupedByCategories,
        isLoading: isLoadingByCategories,
        isError: isErrorByCategories,
        isFetching: isFetchingByCategories,
    } = useExpensesByCategories();
    const {
        data: groupedByDate,
        isLoading: isLoadingByDate,
        isError: isErrorByDate,
        isFetching: isFetchingByDate,
    } = useExpensesByDate();

    useEffect(() => {
        if (!isFetchingByDate && !isFetchingByCategories) {
            setListData(
                groupingMode === ExpenseGroupingMode.Categories
                    ? groupedByCategories
                    : groupedByDate,
            );
        }
    }, [groupingMode, groupedByCategories, groupedByDate]);

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

    const translateData = (lista) => {
        return groupingMode === ExpenseGroupingMode.Categories
            ? lista.map((item) => ({
                  ...item,
                  title: t(`category.${item.title}`),
              }))
            : lista;
    };

    const content =
        isLoadingMainLimit || isLoadingByCategories || isLoadingByDate ? (
            <>
                <BudgetEllipse />
                <LoadingSpinner color={Colors.LightGreen} msg={t('loading')} />
            </>
        ) : isErrorByCategories || isErrorMainLimit || isErrorByDate ? (
            <Text.Regular style={{position: 'absolute', top: '50%'}}>
                {/* @TODO przejście na ekran z błędem*/}
                {/* eslint-disable-next-line react-native/no-raw-text */}
                {'Tu będzie takie fajne przejście do ekranu błędu'}
            </Text.Regular>
        ) : (
            <>
                <BudgetEllipse />
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
                                groupingMode === ExpenseGroupingMode.Categories
                                    ? Icons.FilterDate
                                    : Icons.FilterDollar
                            }
                            onPress={() => {
                                setGroupingMode(
                                    groupingMode === ExpenseGroupingMode.Categories
                                        ? ExpenseGroupingMode.Dates
                                        : ExpenseGroupingMode.Categories,
                                );
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
