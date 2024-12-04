import React from 'react';
import {BudgetMain, BudgetLimits} from '@mobile/components';
import {ExpensesScreens} from '@weddesign/enums';

type guestsPageProps = {
    screen?: ExpensesScreens;
};
const BudgetMainPage = ({screen}: guestsPageProps) => {
    switch (screen) {
        case ExpensesScreens.LIST:
            return <BudgetMain />;
        case ExpensesScreens.LIMITS:
            return <BudgetLimits />;
        // case ExpensesScreens.ADD:
        //     return <BudgetMainPage />;
        default:
            return <BudgetMain />;
    }
};

export default BudgetMainPage;
