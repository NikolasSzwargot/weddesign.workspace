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
    ProgressBar,
} from '@weddesign/components';
import {Colors} from '@weddesign/enums';
import {useTranslation} from 'react-i18next';
import {expenseList, groupedExpensesL} from '@mobile/mocks';
import {Icons} from '@weddesign/assets';
import {getBudgetCategoryData} from '@mobile/utils';
import {Expense} from '@weddesign/types';

import {
    Container,
    BudgetMainWrapper,
    BudgetMainFrame,
    InfoTextWrapper,
    SearchBarWrapper,
} from './styles';

const BudgetMain = () => {
    const {t} = useTranslation('budget');
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [expenses, setExpenses] = useState(expenseList);
    // const [dateFilterOrSth, setDateFilterOrSth] = useState(Date())

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

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch('http://localhost:3000/guests/grouped'); // Replace with your endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch expenses');
                }
                const data: Expense[] = await response.json();
                setExpenses(data); // Set the fetched data into state
            } catch (error) {
                console.error('Error fetching expenses:', error);
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchExpenses();
    }, []); // Empty array ensures the effect runs only once

    const price = {
        total: 111,
        current: 111,
    };

    const content = loading ? (
        <>
            <DudgetEllipse />
            <LoadingSpinner color={Colors.LightGreen} msg={t('loading')} />
        </>
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
                        current={price.current}
                        total={price.total}
                        currency={t('currency')}
                        scrollData={scrollY}
                    />
                    <ProgressBar
                        max={price.total}
                        progress={price.current}
                        backgroundColor={Colors.LightGray}
                        fillColor={Colors.BananaGold}
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
                        percent: Math.round((100 * price.current) / price.total),
                    })}`}</Animated.Text>
                </InfoTextWrapper>

                <SearchBarWrapper>
                    <CustomSearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder={t('searchPlaceholder')}
                    />
                    <IconButton
                        Icon={Icons.FilterDate}
                        onPress={() => console.log('clicked FilterDate')}
                        fillColor={Colors.ButtonGray}
                    />
                    <IconButton
                        Icon={Icons.Plus}
                        onPress={() => console.log('clicked AddGuest')}
                        fillColor={Colors.LightGreen}
                    />
                </SearchBarWrapper>

                <SectionList
                    sections={groupedExpensesL}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <ExpenseItem
                            exp={item}
                            catData={getBudgetCategoryData(item.category)}
                        />
                    )}
                    renderSectionHeader={CustomSectionHeader}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}],
                        {useNativeDriver: false}, // You can't animate layout properties like height natively
                    )}
                    showsVerticalScrollIndicator={true}
                />
            </BudgetMainWrapper>
        </>
    );

    return <Container>{content}</Container>;
};

export default BudgetMain;
