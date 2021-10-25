const ServicesState = {
    login: {
        method: 'post',
        endpoint: 'authentication_token',
        source: 'speedometer-api',
    },
    cashier: {
        index: {
            method: 'get',
            endpoint: 'cashiers',
            source: 'speedometer-api',
        },
        create: {
            method: 'post',
            endpoint: 'cashiers',
            source: 'speedometer-api',
        },
        edit: {
            method: 'put',
            endpoint: 'cashiers',
            source: 'speedometer-api',
        },
        find: {
            method: 'get',
            endpoint: 'cashiers/{id}',
            source: 'speedometer-api',
        },
        remove: {
            method: 'delete',
            endpoint: 'cashiers/{id}',
            source: 'speedometer-api',
        },
    },
    expense: {
        index: {
            method: 'get',
            endpoint: 'payments/expense',
            source: 'speedometer-api',
        },
    },
    revenue: {
        index: {
            method: 'get',
            endpoint: 'payments/revenue',
            source: 'speedometer-api',
        },
    },
    paymentHistories: {
        create: {
            method: 'post',
            endpoint: 'payment-histories',
            source: 'speedometer-api',
        },
    },
    payment: {
        find: {
            method: 'get',
            endpoint: 'payments/{id}',
            source: 'speedometer-api',
        },
        create: {
            method: 'post',
            endpoint: 'payments',
            source: 'speedometer-api',
        },
        edit: {
            method: 'put',
            endpoint: 'payments',
            source: 'speedometer-api',
        },
        remove: {
            method: 'delete',
            endpoint: 'payments/{id}',
            source: 'speedometer-api',
        },
    },
    service: {
        index: {
            method: 'get',
            endpoint: 'services',
            source: 'speedometer-api',
        },
        create: {
            method: 'post',
            endpoint: 'services',
            source: 'speedometer-api',
        },
        edit: {
            method: 'put',
            endpoint: 'services',
            source: 'speedometer-api',
        },
        find: {
            method: 'get',
            endpoint: 'services/{id}',
            source: 'speedometer-api',
        },
        remove: {
            method: 'delete',
            endpoint: 'services/{id}',
            source: 'speedometer-api',
        },
    },
};

export default ServicesState;
