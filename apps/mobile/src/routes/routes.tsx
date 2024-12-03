import React from 'react';
import {
    AppRootRoutes,
    ExpensesScreens,
    GuestsScreens,
    LoginScreens,
    Route,
} from '@weddesign/enums';
import {
    BudgetMainPage,
    GuestListPage,
    HomePage,
    LoginPage,
} from '@mobile/components';

export const LoginRoutingRoutes: Route[] = [
    {
        route: AppRootRoutes.LOGIN,
        screen: LoginScreens.REGISTER,
        element: <LoginPage screen={LoginScreens.REGISTER} />,
    },
    {
        route: AppRootRoutes.LOGIN,
        screen: LoginScreens.LANGUAGE,
        element: <LoginPage screen={LoginScreens.LANGUAGE} />,
    },
    {
        route: AppRootRoutes.LOGIN,
        screen: LoginScreens.SETUP,
        element: <LoginPage screen={LoginScreens.SETUP} />,
    },
];

export const HomeRoutingRoutes: Route[] = [
    {
        route: AppRootRoutes.HOME,
        element: <HomePage />,
    },
];

export const GuestsRoutingRoutes: Route[] = [
    {
        route: AppRootRoutes.GUESTLIST,
        screen: GuestsScreens.LIST,
        element: <GuestListPage screen={GuestsScreens.LIST} />,
    },
    {
        route: AppRootRoutes.GUESTLIST,
        screen: GuestsScreens.ADD,
        element: <GuestListPage screen={GuestsScreens.ADD} />,
    },
];

export const BudgetRoutingRoutes: Route[] = [
    {
        route: AppRootRoutes.BUDGET,
        screen: ExpensesScreens.LIST,
        element: <BudgetMainPage screen={ExpensesScreens.LIST} />,
    },
    {
        route: AppRootRoutes.BUDGET,
        screen: ExpensesScreens.ADD,
        element: <BudgetMainPage screen={ExpensesScreens.ADD} />,
    },
];

export const WeddesignRoutingRoutes: Route[] = [
    ...LoginRoutingRoutes,
    ...HomeRoutingRoutes,
    ...GuestsRoutingRoutes,
    ...BudgetRoutingRoutes,
];
