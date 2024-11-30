import React, {useEffect, useState} from 'react';
import {SectionList} from 'react-native';
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
import {Text} from '@weddesign/themes';
import {useTranslation} from 'react-i18next';
import {expenseList, groupedExpensesL} from '@mobile/mocks';
import {Expense, ExpGroupL} from '@weddesign/types';
import {Icons} from '@weddesign/assets';

import {
    Container,
    BudgetMainWrapper,
    BudgetMainFrame,
    SearchBarWrapper,
    SeparatorContainer,
    SeparatorText,
    ShortSeparatorLine,
} from './styles';

const BudgetMain = () => {
    const {t} = useTranslation('budget');
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [expenses, setExpenses] = useState(expenseList);
    // const [dateFilterOrSth, setDateFilterOrSth] = useState(Date());

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

    const filteredExpenses = expenses.filter((exp) => {
        exp.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const expensesByDate = expenses.filter((exp) => {
        exp.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const price = {
        total: 2137,
        current: 690,
    };

    // TODO: tłumaczenie nie wchodzi
    const renderSectionHeader = ({
        section: {title, limitText},
    }: {
        section: ExpGroupL;
    }) => (
        <SeparatorContainer>
            {/*<ShortSeparatorLine />*/}
            <SeparatorText>{t(`category.${title}`)}</SeparatorText>
            <ShortSeparatorLine />
            <SeparatorText>{limitText ? limitText : 'no_limit'}</SeparatorText>
            {/*<ShortSeparatorLine />*/}
        </SeparatorContainer>
    );

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
                <BudgetMainFrame>
                    <BudgetFrame current={price.current} total={price.total} />
                    <ProgressBar
                        max={price.total}
                        progress={price.current}
                        backgroundColor={Colors.LightGray}
                        fillColor={Colors.BananaGold}
                    />
                    <Text.Regular size={16} style={{textAlign: 'center'}}>{`${t(
                        'mainProgressbarText',
                        {percent: Math.round((100 * price.current) / price.total)},
                    )}`}</Text.Regular>
                </BudgetMainFrame>
                <SearchBarWrapper>
                    <CustomSearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder={t('searchPlaceholder')}
                    />
                    <IconButton
                        Icon={Icons.File}
                        onPress={() => console.log('clicked Filter')}
                    />
                    <IconButton
                        Icon={Icons.Plus}
                        onPress={() => console.log('clicked AddGuest')}
                    />
                </SearchBarWrapper>

                {/*TODO - szerokość cośnie ten tego*/}
                <SectionList
                    sections={groupedExpensesL}
                    keyExtractor={(item) => `siema ${item.id.toString()}`}
                    renderItem={({item}) => <ExpenseItem exp={item} />}
                    renderSectionHeader={CustomSectionHeader}
                    showsVerticalScrollIndicator={true}
                />
            </BudgetMainWrapper>
        </>
    );

    return <Container>{content}</Container>;
};

export default BudgetMain;
