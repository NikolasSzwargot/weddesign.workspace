// ----- GENERAL ROUTES -----
export enum AppRootRoutes {
    LOGIN = '/login',
    HOME = '/home',
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

export type WeddesignRoutes = LoginRoutes | HomeRoutes;
