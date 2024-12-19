// ----- GENERAL ROUTES -----
export enum AppRootRoutes {
    LOGIN = '/login',
    HOME = '/home',
    GUESTLIST = '/guests',
    ERROR = '/error',
    PROVIDERS = '/providers',
}

// ----- LOGIN SUBROUTES -----
export enum LoginRoutes {
    LANGUAGE = '/login/language',
    REGISTER = '/login/register',
    SETUP = '/login/setup',
    NAMESSETUP = '/login/names',
}

// ----- HOME SUBROUTES -----
export enum HomeRoutes {
    HOME = '/home',
}

// ----- GUEST LIST SUBROUTES -----
export enum GuestListRoutes {
    GUESTLIST = '/guests',
    LIST = '/guests/list',
    ADD = '/guests/add',
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

export type WeddesignRoutes =
    | LoginRoutes
    | HomeRoutes
    | GuestListRoutes
    | ErrorRoutes
    | ProvidersRoutes;
