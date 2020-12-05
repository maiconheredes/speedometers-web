const GlobalState = {
    environment: {
        prod: {
            'speedometer-api': process.env.REACT_APP_PROD_DOMAIN,
        },
        dev: {
            'speedometer-api': 'http://localhost',
        },
    },
};

export default GlobalState;
