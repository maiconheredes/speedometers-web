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
    },
};

export default Paths;
