import React from 'react';
import {
    AppRootRoutes,
    ErrorScreens,
    ExpensesScreens,
    GuestsScreens,
    LoginScreens,
    ProvidersScreens,
    Route,
    TasksScreens,
} from '@weddesign/enums';

import {
    ErrorPage,
    GuestListPage,
    HomePage,
    LoginPage,
    ProvidersPage,
    BudgetMainPage,
    TasksPage,
} from '../index';

export const LoginRoutingRoutes: Route[] = [
    {
        route: AppRootRoutes.LOGIN,
        element: <LoginPage />,
    },
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
    {
        route: AppRootRoutes.LOGIN,
        screen: LoginScreens.NAMES,
        element: <LoginPage screen={LoginScreens.NAMES} />,
    },
    {
        route: AppRootRoutes.LOGIN,
        screen: LoginScreens.DATE,
        element: <LoginPage screen={LoginScreens.DATE} />,
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
    {
        route: AppRootRoutes.GUESTLIST,
        screen: GuestsScreens.FILTER,
        element: <GuestListPage screen={GuestsScreens.FILTER} />,
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
    {
        route: AppRootRoutes.BUDGET,
        screen: ExpensesScreens.LIMITS,
        element: <BudgetMainPage screen={ExpensesScreens.LIMITS} />,
    },
];

export const ErrorRoutingRoutes: Route[] = [
    {
        route: AppRootRoutes.ERROR,
        screen: ErrorScreens.GENERAL,
        element: <ErrorPage screen={ErrorScreens.GENERAL} />,
    },
];

export const ProvidersRoutingRoutes: Route[] = [
    {
        route: AppRootRoutes.PROVIDERS,
        screen: ProvidersScreens.GROUPED,
        element: <ProvidersPage screen={ProvidersScreens.GROUPED} />,
    },
    {
        route: AppRootRoutes.PROVIDERS,
        screen: ProvidersScreens.LIST,
        element: <ProvidersPage screen={ProvidersScreens.LIST} />,
    },
    {
        route: AppRootRoutes.PROVIDERS,
        screen: ProvidersScreens.ADD,
        element: <ProvidersPage screen={ProvidersScreens.ADD} />,
    },
];

export const TasksRoutingRoutes: Route[] = [
    {
        route: AppRootRoutes.TASKS,
        screen: TasksScreens.LIST,
        element: <TasksPage screen={TasksScreens.LIST} />,
    },
    {
        route: AppRootRoutes.TASKS,
        screen: TasksScreens.ADD,
        element: <TasksPage screen={TasksScreens.ADD} />,
    },
];

export const WeddesignRoutingRoutes: Route[] = [
    ...LoginRoutingRoutes,
    ...HomeRoutingRoutes,
    ...GuestsRoutingRoutes,
    ...BudgetRoutingRoutes,
    ...ErrorRoutingRoutes,
    ...ProvidersRoutingRoutes,
    ...TasksRoutingRoutes,
];
