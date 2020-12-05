const Paths = {
    index: '/',
    login: '/login',
    administration: {
        index: '/administration',
        expense: {
            index: '/administration/expenses',
            create: '/administration/expenses/create',
            find: '/administration/expenses/show/:idPayment',
            edit: '/administration/expenses/edit/:idPayment',
        },
        cashier: {
            index: '/administration/cashiers',
            create: '/administration/cashiers/create',
            find: '/administration/cashiers/show/:idCashier',
            edit: '/administration/cashiers/edit/:idCashier',
        },
    },
};

export default Paths;
