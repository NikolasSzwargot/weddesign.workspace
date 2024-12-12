import React from 'react';
import {
    AppRootRoutes,
    ErrorScreens,
    GuestsScreens,
    LoginScreens,
    Route,
} from '@weddesign/enums';
import {GuestListPage, HomePage, LoginPage} from '@mobile/components';

import ErrorPage from '../components/pages/ErrorPage';

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

export const ErrorRoutingRoutes: Route[] = [
    {
        route: AppRootRoutes.ERROR,
        screen: ErrorScreens.GENERAL,
        element: <ErrorPage screen={ErrorScreens.GENERAL} />,
    },
];

export const WeddesignRoutingRoutes: Route[] = [
    ...LoginRoutingRoutes,
    ...HomeRoutingRoutes,
    ...GuestsRoutingRoutes,
    ...ErrorRoutingRoutes,
];
