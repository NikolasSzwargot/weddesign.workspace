import { ReactNode } from 'react';
import { AppRootRoutes } from './routes';
export type Route = {
    route: AppRootRoutes;
    screen?: string;
    queryParams?: Record<string, string>;
    element: ReactNode;
};
export declare enum LoginScreens {
    LANGUAGE = "/language",
    REGISTER = "/register",
    SETUP = "/setup",
    NAMES = "/names",
    DATE = "/date"
}
export declare enum GuestsScreens {
    LIST = "/list",
    ADD = "/add"
}
export declare enum ErrorScreens {
    GENERAL = "/general"
}
