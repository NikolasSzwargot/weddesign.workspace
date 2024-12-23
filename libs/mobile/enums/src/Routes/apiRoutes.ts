export enum ApiRoutes {
    Hello = '/',
    Login = '/auth/login',
    Register = '/auth/register',
    GuestsGrouped = '/guests/grouped',
    GuestsCount = '/guests/count',
    GuestsDelete = '/guests',
    GuestsCreate = '/guests/create',
    GuestsUpdate = '/guests/update/:id',

    ExpensesByCategory = '/budget/expense/groupedByCategory',
    ExpensesByDate = '/budget/expense/groupedByDate',
    MainLimitStats = '/budget/limit',
    CategoriesData = '/budget/categories',
}
