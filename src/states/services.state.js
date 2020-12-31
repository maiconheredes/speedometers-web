const ServicesState = {
    login: {
        method: 'post',
        endpoint: 'authentication_token',
        source: 'speedometer-api',
        port: 80,
    },
    cashier: {
        index: {
            method: 'get',
            endpoint: 'cashiers',
            source: 'speedometer-api',
            port: 80,
        },
        create: {
            method: 'post',
            endpoint: 'cashiers',
            source: 'speedometer-api',
            port: 80,
        },
        edit: {
            method: 'put',
            endpoint: 'cashiers',
            source: 'speedometer-api',
            port: 80,
        },
        find: {
            method: 'get',
            endpoint: 'cashiers/{id}',
            source: 'speedometer-api',
            port: 80,
        },
        remove: {
            method: 'delete',
            endpoint: 'cashiers/{id}',
            source: 'speedometer-api',
            port: 80,
        },
    },
    expense: {
        index: {
            method: 'get',
            endpoint: 'payments/expense',
            source: 'speedometer-api',
            port: 80,
        },
    },
    revenue: {
        index: {
            method: 'get',
            endpoint: 'payments/revenue',
            source: 'speedometer-api',
            port: 80,
        },
    },
    paymentHistories: {
        create: {
            method: 'post',
            endpoint: 'payment-histories',
            source: 'speedometer-api',
            port: 80,
        },
    },
    payment: {
        find: {
            method: 'get',
            endpoint: 'payments/{id}',
            source: 'speedometer-api',
            port: 80,
        },
        create: {
            method: 'post',
            endpoint: 'payments',
            source: 'speedometer-api',
            port: 80,
        },
        edit: {
            method: 'put',
            endpoint: 'payments',
            source: 'speedometer-api',
            port: 80,
        },
        remove: {
            method: 'delete',
            endpoint: 'payments/{id}',
            source: 'speedometer-api',
            port: 80,
        },
    },
    service: {
        index: {
            method: 'get',
            endpoint: 'services',
            source: 'speedometer-api',
            port: 80,
        },
        create: {
            method: 'post',
            endpoint: 'services',
            source: 'speedometer-api',
            port: 80,
        },
        edit: {
            method: 'put',
            endpoint: 'services',
            source: 'speedometer-api',
            port: 80,
        },
        find: {
            method: 'get',
            endpoint: 'services/{id}',
            source: 'speedometer-api',
            port: 80,
        },
        remove: {
            method: 'delete',
            endpoint: 'services/{id}',
            source: 'speedometer-api',
            port: 80,
        },
    },
};

export default ServicesState;
