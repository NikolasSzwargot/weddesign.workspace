import React, {useEffect, useRef, useState} from 'react';
import {Animated, SectionList} from 'react-native';
import {
    BudgetFrame,
    CustomSectionHeader,
    CustomSearchBar,
    IconButton,
    ExpenseItem,
    Header,
    LoadingSpinner,
    BudgetStatusBar,
    BackgroundEllipse,
} from '@weddesign/components';
import {
    Colors,
    ErrorRoutes,
    ExpenseGroupingMode,
    ExpenseListRoutes,
    HomeRoutes,
} from '@weddesign/enums';
import {useTranslation} from 'react-i18next';
import {Icons} from '@weddesign/assets';
import {getBudgetCategoryData} from '@weddesign-mobile/utils';

import {useExpensesByCategories} from '../../../api/Budget/useExpensesByCategories';
import {useExpensesByDate} from '../../../api/Budget/useExpensesByDate';
import {useMainLimit} from '../../../api/Budget/useMainLimit';
import {useRouting} from '../../providers';

import {
    Container,
    BudgetMainWrapper,
    BudgetMainFrame,
    InfoTextWrapper,
    SearchBarWrapper,
} from './styles';

const BudgetMain = () => {
    const {router} = useRouting();
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
        if (!isLoadingByDate && !isLoadingByCategories) {
            setListData(
                groupingMode === ExpenseGroupingMode.Categories
                    ? groupedByCategories
                    : groupedByDate,
            );
        }
    }, [groupingMode, groupedByCategories, groupedByDate, router]);

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

    useEffect(() => {
        if (isErrorByCategories || isErrorMainLimit || isErrorByDate) {
            router.navigate(ErrorRoutes.GENERAL, 'budget');
        }
    }, [isErrorByCategories, isErrorMainLimit, isErrorByDate, router]);

    const content =
        isLoadingMainLimit || isLoadingByCategories || isLoadingByDate ? (
            <>
                <BackgroundEllipse variant={'budget'} />
                <LoadingSpinner color={Colors.LightGreen} msg={t('loading')} />
            </>
        ) : (
            <>
                <BackgroundEllipse variant={'budget'} />
                <BudgetMainWrapper>
                    <Header onTitlePress={() => router.navigate(HomeRoutes.HOME)} />
                    <BudgetMainFrame
                        onPress={() => router.navigate(ExpenseListRoutes.LIMITS)}
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
