export enum ApiRoutes {
    Login = '/auth/login',
    Register = '/auth/register',
    Profile = '/auth/profile',

    GuestsGrouped = '/guests/grouped',
    GuestsCount = '/guests/count',
    GuestsDelete = '/guests/:id',
    GuestsCreate = '/guests',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    GuestsUpdate = '/guests/:id',

    ExpensesByCategory = '/budget/expense/groupedByCategory',
    ExpensesByDate = '/budget/expense/groupedByDate',
    MainLimitStats = '/budget/limit',
    CategoriesData = '/budget/categories',
    ExpenseCreate = '/budget/expense',
    SingleExpense = '/budget/expense/:id',
    CategoriesLimits = '/budget/categories/limit',
    CategoriesLimitsSingle = '/budget/categories/limit/:categoryId',

    ProvidersCategories = '/providers/categories',
    ProvidersCategoriesDelete = '/providers/categories/:id',
    ProvidersGroupedByStarsInCategory = '/providers/groupedByStarsInCategory/:categoryId',
    ProvidersCreate = '/providers',
    ProvidersDelete = '/providers/:id',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    ProvidersUpdate = '/providers/:id',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    ProvidersCategoryCreate = '/providers/categories',

    TasksGrouped = '/tasks/groupedDeadline',
    TasksDelete = '/tasks/:id',
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    TasksUpdate = '/tasks/:id',
    TasksCreate = '/tasks',
    TasksUpcomingTask = '/tasks/upcomingTask',
}
