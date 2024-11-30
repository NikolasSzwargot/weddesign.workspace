import React from 'react';
import {
    ExpenseItemContainer,
    ExpenseInfoContainer,
    ExpenseName,
    StatusDot,
} from './styles';

import {categoryData, Expense} from '@weddesign/types';
import {Icons} from '@weddesign/assets';
import {IconButton} from '@weddesign/components';
// import {getBudgetCategoryData} from '@mobile/utils';

type ExpenseItemProps = {
    exp: Expense;
    catData: categoryData;
};

// const ExpenseItem = ({exp}: ExpenseItemProps) => {
// const data = getBudgetCategoryData(exp.category);
const ExpenseItem = ({exp, catData}: ExpenseItemProps) => {
    return (
        <ExpenseItemContainer onPress={() => console.log(exp.name)}>
            <ExpenseInfoContainer>
                <StatusDot color={catData.color}>
                    <catData.icon />
                </StatusDot>
                <ExpenseName>{exp.name}</ExpenseName>
            </ExpenseInfoContainer>
            <IconButton
                Icon={Icons.X}
                onPress={() => console.log(`delete ${exp.name}`)}
            />
        </ExpenseItemContainer>
    );
};

// TODO: modal od usuwania -> IconButton onPress
// TODO: nawigacja do edycji -> ExpenseItemContainer onPress

export default ExpenseItem;
