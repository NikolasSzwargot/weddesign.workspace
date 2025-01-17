import {ReactNode} from 'react';
import {AppRootRoutes} from './routes';

export type Route = {
    route: AppRootRoutes;
    screen?: string;
    queryParams?: Record<string, string>;
    element: ReactNode;
};

export enum LoginScreens {
    LANGUAGE = '/language',
    REGISTER = '/register',
    SETUP = '/setup',
    NAMES = '/names',
    DATE = '/date',
}

export enum GuestsScreens {
    LIST = '/list',
    ADD = '/add',
    FILTER = '/filter',
}

export enum ExpensesScreens {
    LIST = '/list',
    LIMITS = '/limits',
    ADD = '/add',
}

export enum ErrorScreens {
    GENERAL = '/general',
}

export enum ProvidersScreens {
    GROUPED = '/grouped',
    LIST = '/list',
    ADD = '/add',
}

export enum TasksScreens {
    LIST = '/list',
    ADD = '/add',
}
