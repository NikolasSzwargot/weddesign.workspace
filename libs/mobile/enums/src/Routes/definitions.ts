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
    DATE = '/date',
}

// ----- GUESTS -----
export enum GuestsScreens {
    LIST = '/list',
    ADD = '/add',
}
