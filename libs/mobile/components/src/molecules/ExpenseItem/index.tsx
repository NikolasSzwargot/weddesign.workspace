import React from 'react';
import {
    ExpenseItemContainer,
    ExpenseInfoContainer,
    ExpenseName,
    StatusDot,
} from './styles';

import {Expense} from '@weddesign/types';
import {Icons} from '@weddesign/assets';
import {IconButton} from '@weddesign/components';
import {getBudgetCategoryData} from '@mobile/utils';

type ExpenseItemProps = {
    exp: Expense;
};

const ExpenseItem = ({exp}: ExpenseItemProps) => {
    const data = getBudgetCategoryData(exp.category);
    return (
        // TODO: znaleść dobre miejsce do klikania
        <ExpenseItemContainer onPress={() => console.log(exp.name)}>
            <ExpenseInfoContainer>
                <StatusDot color={data.color}>
                    <data.icon />
                    {/*<Icons.File />*/}
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

export default ExpenseItem;
