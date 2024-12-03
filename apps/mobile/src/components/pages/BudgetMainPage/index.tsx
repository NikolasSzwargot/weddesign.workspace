import React from 'react';
import {BudgetMain} from '@mobile/components';
import {ExpensesScreens} from '@weddesign/enums';

type guestsPageProps = {
    screen?: ExpensesScreens;
};
const BudgetMainPage = ({screen}: guestsPageProps) => {
    switch (screen) {
        // case ExpensesScreens.LIST:
        //     return <BudgetMain />;
        // case ExpensesScreens.ADD:
        //     return <BudgetMainPage />;
        default:
            return <BudgetMain />;
    }
};

export default BudgetMainPage;
