export enum AppRootRoutes {
    LOGIN = '/login',
    HOME = '/home',
    GUESTLIST = '/guests',
    BUDGET = '/budget',
    ERROR = '/error',
    PROVIDERS = '/providers',
    TASKS = '/tasks',
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
    FILTER = '/guests/filter',
}

export enum ExpenseListRoutes {
    BUDGET = '/budget',
    LIST = '/budget/list',
    LIMITS = '/budget/limits',
    ADD = '/budget/add',
}

export enum ErrorRoutes {
    GENERAL = '/error/general',
}

export enum ProvidersRoutes {
    PROVIDERS = '/providers',
    GROUPED = '/providers/grouped',
    LIST = '/providers/list',
    ADD = '/providers/add',
}

export enum TasksRoutes {
    LIST = '/tasks/list',
    ADD = '/tasks/add',
    FILTER = '/tasks/filter',
}

export type WeddesignRoutes =
    | LoginRoutes
    | HomeRoutes
    | GuestListRoutes
    | ExpenseListRoutes
    | ErrorRoutes
    | ProvidersRoutes
    | TasksRoutes;
