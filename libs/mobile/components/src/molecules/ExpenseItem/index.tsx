import React from 'react';
import {
    ExpenseItemContainer,
    ExpenseInfoContainer,
    ExpenseRightContainer,
    ExpenseName,
    StatusDot,
} from './styles';

import {categoryData} from '@weddesign/types';
import {Icons} from '@weddesign/assets';
import {IconButton} from '@weddesign/components';
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

export default ExpenseItem;
