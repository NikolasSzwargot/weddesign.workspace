import React from 'react';
import {BudgetMain} from '@mobile/components';
import {ExpensesScreens} from '@weddesign/enums';

import ExpenseForm from '../../organisms/BudgetMain/ExpenseForm';

type guestsPageProps = {
    screen?: ExpensesScreens;
};
const BudgetMainPage = ({screen}: guestsPageProps) => {
    switch (screen) {
        case ExpensesScreens.LIST:
            return <BudgetMain />;
        case ExpensesScreens.ADD:
            return <ExpenseForm />;
        default:
            return <BudgetMain />;
    }
};

export default BudgetMainPage;
