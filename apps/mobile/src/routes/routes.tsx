import React from 'react';
import {AppRootRoutes, GuestsScreens, LoginScreens, Route} from '@weddesign/enums';
import {GuestListPage, HomePage, LoginPage} from '@mobile/components';

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

export const WeddesignRoutingRoutes: Route[] = [
    ...LoginRoutingRoutes,
    ...HomeRoutingRoutes,
    ...GuestsRoutingRoutes,
];
