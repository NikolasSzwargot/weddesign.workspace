import React from 'react';
import {
    ExpenseItemContainer,
    ExpenseInfoContainer,
    ExpenseRightContainer,
    ExpenseName,
} from './styles';

import {categoryData} from '@weddesign/types';
import {ExpenseDto} from '@shared/dto';
import {Icons} from '@weddesign/assets';
import {IconButton, IconDot} from '@weddesign/components';
import {Text} from '@weddesign/themes';

type ExpenseItemProps = {
    expense: ExpenseDto;
    currency?: string;
    catData: categoryData;
    onExpensePress: () => void;
    onDeletePress: (expense: ExpenseDto) => void;
};

const ExpenseItem = ({
    expense,
    currency,
    catData,
    onExpensePress,
    onDeletePress,
}: ExpenseItemProps) => {
    return (
        <ExpenseItemContainer onPress={onExpensePress}>
            <ExpenseInfoContainer>
                <IconDot color={catData.color} Icon={catData.icon} />
                <ExpenseName>{expense.name}</ExpenseName>
            </ExpenseInfoContainer>
            <ExpenseRightContainer>
                <Text.Bold style={{fontSize: 14}}>
                    {expense.amount}
                    {currency}
                </Text.Bold>
                <IconButton Icon={Icons.X} onPress={() => onDeletePress(expense)} />
            </ExpenseRightContainer>
        </ExpenseItemContainer>
    );
};

export default ExpenseItem;
