import React from 'react';
import {
    ExpenseItemContainer,
    ExpenseInfoContainer,
    ExpenseRightContainer,
    ExpenseName,
    StatusDot,
} from './styles';
// import {ExpenseDto} from '@shared/dto';

import {categoryData, Expense} from '@weddesign/types';
import {Icons} from '@weddesign/assets';
import {IconButton} from '@weddesign/components';
// import {getBudgetCategoryData} from '@mobile/utils';
import {Text} from '@weddesign/themes';

type ExpenseItemProps = {
    expName: string;
    expAmount: number;
    currency?: string;
    catData: categoryData;
};

// const ExpenseItem = ({exp}: ExpenseItemProps) => {
// const data = getBudgetCategoryData(exp.category);
const ExpenseItem = ({expName, expAmount, currency, catData}: ExpenseItemProps) => {
    return (
        <ExpenseItemContainer onPress={() => console.log(expName)}>
            <ExpenseInfoContainer>
                <StatusDot color={catData.color}>
                    <catData.icon />
                </StatusDot>
                <ExpenseName>{expName}</ExpenseName>
            </ExpenseInfoContainer>
            <ExpenseRightContainer>
                <Text.Bold style={{fontSize: 14}}>
                    {expAmount}
                    {currency}
                </Text.Bold>
                <IconButton
                    Icon={Icons.X}
                    onPress={() => console.log(`delete ${expName}`)}
                />
            </ExpenseRightContainer>
        </ExpenseItemContainer>
    );
};

// TODO: modal od usuwania -> IconButton onPress
// TODO: nawigacja do edycji -> ExpenseItemContainer onPress

export default ExpenseItem;
