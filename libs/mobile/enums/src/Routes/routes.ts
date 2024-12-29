export enum AppRootRoutes {
    LOGIN = '/login',
    HOME = '/home',
    GUESTLIST = '/guests',
    BUDGET = '/budget',
    ERROR = '/error',
}

export enum LoginRoutes {
    LANGUAGE = '/login/language',
    REGISTER = '/login/register',
    SETUP = '/login/setup',
    NAMESSETUP = '/login/names',
    DATESETUP = '/login/date',
}

export enum HomeRoutes {
    HOME = '/home',
}

export enum GuestListRoutes {
    GUESTLIST = '/guests',
    LIST = '/guests/list',
    ADD = '/guests/add',
}

export enum ExpenseListRoutes {
    BUDGET = '/budget',
    LIST = '/budget/list',
    ADD = '/budget/add',
}

export enum ErrorRoutes {
    GENERAL = '/error/general',
}

export type WeddesignRoutes =
    | LoginRoutes
    | HomeRoutes
    | GuestListRoutes
    | ExpenseListRoutes
    | ErrorRoutes;
