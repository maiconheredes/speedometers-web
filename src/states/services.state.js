const ServicesState = {
    login: {
        method: 'post',
        endpoint: 'authentication_token',
        source: 'speedometer-api',
        port: 80,
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
    payment: {
        show: {
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
};

export default ServicesState;
