import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, SectionList, TextStyle} from 'react-native';
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
import {getBudgetCategoryData, searchByQuery} from '@weddesign-mobile/utils';
import {ExpenseDto, ExpensesByCategoryDto, ExpensesByDateDto} from '@shared/dto';

import {
    useExpensesByCategories,
    useExpensesByDate,
    useMainLimit,
    useDeleteExpense,
} from '../../../api';
import {useRouting} from '../../providers';
import {WeddesignConfirmationModal} from '../../molecules';

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
    // const [debouncedQuery] = useDebounce(searchQuery, 2000);
    const [groupingMode, setGroupingMode] = useState<
        ExpenseGroupingMode.Categories | ExpenseGroupingMode.Dates
    >(ExpenseGroupingMode.Categories);
    const [isModalVisible, setModalVisible] = useState(false);
    const [confirmationModalText, setConfirmationModalText] = useState('');
    const [listData, setListData] = useState([]);
    const [selectedItem, setSelectedItem] = useState<ExpenseDto | null>(null);
    const {mutate: deleteExpense} = useDeleteExpense();

    const {
        data: mainLimitData,
        isLoading: isLoadingMainLimit,
        isError: isErrorMainLimit,
    } = useMainLimit();
    const {
        data: groupedByCategories,
        isLoading: isLoadingByCategories,
        isError: isErrorByCategories,
    } = useExpensesByCategories();
    const {
        data: groupedByDate,
        isLoading: isLoadingByDate,
        isError: isErrorByDate,
    } = useExpensesByDate();

    const handleDelete = (exp: ExpenseDto) => {
        setSelectedItem(exp);
        setConfirmationModalText(
            t('deleteMessage', {
                expName: exp.name,
            }),
        );
        setModalVisible(true);
    };
    const handleYes = () => {
        const handleError = () => {
            router.navigate(ErrorRoutes.GENERAL, 'budget');
        };
        setModalVisible(false);
        deleteExpense(
            {expenseId: selectedItem?.id},
            {
                onError: handleError,
            },
        );
    };
    const handleCancel = () => {
        setModalVisible(false);
    };

    const translateData = useCallback(
        (list: ExpensesByCategoryDto[] | ExpensesByDateDto[]) => {
            return groupingMode === ExpenseGroupingMode.Categories
                ? list.map((item: ExpensesByCategoryDto | ExpensesByDateDto) => ({
                      ...item,
                      title: t(`category.${item.title}`),
                  }))
                : list;
        },
        [groupingMode, t],
    );

    useEffect(() => {
        if (!isLoadingByDate && !isLoadingByCategories) {
            const rawData =
                groupingMode === ExpenseGroupingMode.Categories
                    ? groupedByCategories
                    : groupedByDate;

            const translatedData = translateData(rawData);
            const filteredData = searchByQuery(translatedData, searchQuery);

            setListData(filteredData);
        }
    }, [
        groupingMode,
        groupedByCategories,
        groupedByDate,
        router,
        isLoadingByDate,
        isLoadingByCategories,
        translateData,
        searchQuery,
    ]);

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
    const animatedTextStyle: Animated.WithAnimatedObject<TextStyle> = useMemo(
        () => ({
            fontSize: 14,
            fontWeight: '500',
            textAlign: 'center',
        }),
        [],
    );

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
                            style={[infoTextAnimation, animatedTextStyle]}
                        >
                            {mainLimitData.totalPercent
                                ? t('mainProgressbarText', {
                                      percent: Math.round(
                                          mainLimitData.totalPercent,
                                      ),
                                  })
                                : t('pressToSetLimit')}
                        </Animated.Text>
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
                            onPress={() => router.navigate(ExpenseListRoutes.ADD)}
                            fillColor={Colors.LightGreen}
                        />
                    </SearchBarWrapper>

                    <SectionList
                        sections={listData}
                        initialNumToRender={20}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <ExpenseItem
                                expense={item}
                                currency={t('currency')}
                                catData={getBudgetCategoryData(item.categoryId)}
                                onExpensePress={() => {
                                    router.navigate(ExpenseListRoutes.ADD, item);
                                }}
                                onDeletePress={handleDelete}
                            />
                        )}
                        renderSectionHeader={CustomSectionHeader}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: scrollY}}}],
                            {useNativeDriver: false},
                        )}
                        showsVerticalScrollIndicator={true}
                    />
                    <WeddesignConfirmationModal
                        isVisible={isModalVisible}
                        onBackdropPress={handleCancel}
                        onYesPress={handleYes}
                        onNoPress={handleCancel}
                        message={confirmationModalText}
                    ></WeddesignConfirmationModal>
                </BudgetMainWrapper>
            </>
        );

    return <Container>{content}</Container>;
};

export default BudgetMain;
