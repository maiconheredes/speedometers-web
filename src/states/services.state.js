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
};

export default ServicesState;
