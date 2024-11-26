export * from './routes';
export * from './definitions';
export enum ApiRoutes {
    Hello = '/',
    Login = '/auth/login',
    Register = '/auth/register',
    GuestsGrouped = '/guests/grouped',
    GuestsCount = '/guests/count',
}
