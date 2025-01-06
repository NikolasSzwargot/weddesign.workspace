import React from 'react';
import { BudgetMain } from '@weddesign-mobile/components';
import { ExpensesScreens } from '@weddesign/enums';

type guestsPageProps = {
  screen?: ExpensesScreens;
};
const BudgetMainPage = ({ screen }: guestsPageProps) => {
  switch (screen) {
    case ExpensesScreens.LIST:
      return <BudgetMain />;
    case ExpensesScreens.ADD:
      return <BudgetMain />;
    default:
      return <BudgetMain />;
  }
};

export default BudgetMainPage;
