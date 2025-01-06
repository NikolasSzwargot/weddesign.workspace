export declare enum AppRootRoutes {
    LOGIN = "/login",
    HOME = "/home",
    GUESTLIST = "/guests",
    ERROR = "/error"
}
export declare enum LoginRoutes {
    LANGUAGE = "/login/language",
    REGISTER = "/login/register",
    SETUP = "/login/setup",
    NAMESSETUP = "/login/names",
    DATESETUP = "/login/date"
}
export declare enum HomeRoutes {
    HOME = "/home"
}
export declare enum GuestListRoutes {
    GUESTLIST = "/guests",
    LIST = "/guests/list",
    ADD = "/guests/add"
}
export declare enum ErrorRoutes {
    GENERAL = "/error/general"
}
export type WeddesignRoutes = LoginRoutes | HomeRoutes | GuestListRoutes | ErrorRoutes;
