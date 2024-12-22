import {ReactNode} from 'react';
import {AppRootRoutes} from './routes';

export type Route = {
    route: AppRootRoutes;
    screen?: string;
    queryParams?: Record<string, string>;
    element: ReactNode;
};

// ----- LOGIN -----
export enum LoginScreens {
    LANGUAGE = '/language',
    REGISTER = '/register',
    SETUP = '/setup',
    NAMES = '/names',
}

// ----- GUESTS -----
export enum GuestsScreens {
    LIST = '/list',
    ADD = '/add',
}

// ----- EXPENSES -----
export enum ExpensesScreens {
    LIST = '/list',
    ADD = '/add',
}

export enum ErrorScreens {
    GENERAL = '/general',
}
