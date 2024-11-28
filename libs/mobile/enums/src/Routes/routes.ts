// ----- GENERAL ROUTES -----
export enum AppRootRoutes {
    LOGIN = '/login',
    HOME = '/home',
    GUESTLIST = '/guests',
}

// ----- LOGIN SUBROUTES -----
export enum LoginRoutes {
    LANGUAGE = '/login/language',
    REGISTER = '/login/register',
    SETUP = '/login/setup',
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

export type WeddesignRoutes = LoginRoutes | HomeRoutes;
