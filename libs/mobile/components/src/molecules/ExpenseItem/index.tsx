import React from 'react';
import {
    ExpenseItemContainer,
    ExpenseInfoContainer,
    ExpenseRightContainer,
    ExpenseName,
} from './styles';

import {categoryData} from '@weddesign/types';
import {Icons} from '@weddesign/assets';
import {IconButton, IconDot} from '@weddesign/components';
import {Text} from '@weddesign/themes';

type ExpenseItemProps = {
    expName: string;
    expAmount: number;
    currency?: string;
    catData: categoryData;
};

const ExpenseItem = ({expName, expAmount, currency, catData}: ExpenseItemProps) => {
    return (
        <ExpenseItemContainer onPress={() => console.log(expName)}>
            <ExpenseInfoContainer>
                <IconDot color={catData.color} Icon={catData.icon} />
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

export default ExpenseItem;
