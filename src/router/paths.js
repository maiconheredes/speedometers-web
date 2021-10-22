const Paths = {
    index: '/',
    login: '/login',
    administration: {
        index: '/administration',
        expense: {
            index: '/administration/expenses',
            create: '/administration/expenses/create',
            show: '/administration/expenses/show/:idPayment',
            edit: '/administration/expenses/edit/:idPayment',
        },
        revenue: {
            index: '/administration/revenues',
            create: '/administration/revenues/create',
            show: '/administration/revenues/show/:idPayment',
            edit: '/administration/revenues/edit/:idPayment',
        },
        cashier: {
            index: '/administration/cashiers',
            create: '/administration/cashiers/create',
            show: '/administration/cashiers/show/:idCashier',
            edit: '/administration/cashiers/edit/:idCashier',
        },
        service: {
            index: '/administration/services',
            create: '/administration/services/create',
            show: '/administration/services/show/:idService',
            edit: '/administration/services/edit/:idService',
        },
    },
};

export default Paths;
