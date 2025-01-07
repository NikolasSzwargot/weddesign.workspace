export enum ApiRoutes {
    Hello = '/',
    Login = '/auth/login',
    Register = '/auth/register',
    Profile = '/auth/profile',

    GuestsGrouped = '/guests/grouped',
    GuestsCount = '/guests/count',
    GuestsDelete = '/guests/:id',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    GuestsCreate = '/guests',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    GuestsUpdate = '/guests/:id',

    ExpensesByCategory = '/budget/expense/groupedByCategory',
    ExpensesByDate = '/budget/expense/groupedByDate',
    MainLimitStats = '/budget/limit',
    CategoriesData = '/budget/categories',

    ProvidersCategoriesAll = '/providers/categories/all',
    ProvidersCategoriesDelete = '/providers/categories/delete',
    ProvidersGroupedByStarsInCategory = '/providers/groupedByStarsInCategory',
    ProvidersDelete = '/providers',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    ProvidersCreate = '/providers',
    ProvidersUpdate = '/providers/:id',
}
