import environment from './config';


const requester = async (service, options = {}) => {
    const { method, endpoint, source } = service;
    const baseURL = environment[source];

    const {
        body = undefined,
        mode = undefined,
        responseType = 'json',
        qs = {},
    } = options;

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const config = {
        method,
        url: `${`${baseURL}/`}${endpoint}`,
        body,
        headers,
        mode,
        qs,
    };

    let url = new URL(config.url);
    url.search = new URLSearchParams(config.qs);

    const getResponseType = (response) => {
        if (responseType === 'json') {
            return response.json();
        }

        return response.text();
    };

    try {
        return fetch(url, config)
            .then(response => getResponseType(response))
            .then(response => {
                if (response === '') {
                    return [null, 'empty'];
                }

                return [null, response];
            })
            .catch(error => {
                if (error === '') {
                    return [null, 'empty'];
                }

                return [error, null];
            });
    } catch (error) {
        return [error, null];
    }
};

export default requester;
