import Paths from '../router/paths';


export const nullOrEmpty = (value) => {
    return (value === null || value === '' || value === undefined);
};

export const notNullOrEmpty = (value) => {
    return (!(value === null || value === '' || value === undefined));
};

export const validateValue = (value) => {
    if (
        value === undefined ||
        value === null
    ) {
        return '';
    }

    return value;
};

export const inDevelopment = () => {
    return (process.env.NODE_ENV !== 'production')
};

const handlingAuthResponse = (authResponse) => {
    if (authResponse.message === 'Invalid credentials.') {
        alert('Usuário ou Senha inválidos!');
        return;
    }
    
    localStorage.setItem('token', null);
    window.location.href = Paths.login;
    return;
};

export const handlingRequest = (
    error, response, onEErrors = () => {}, 
    onError = () => {}, onResponse = () => {}
) => {
    let responseObject = verifyStringObject(response);
    let errorObject = verifyStringObject(error);
    let returnItem;

    if (errorObject) {
        if (errorObject.errors) {
            returnItem = errorObject.errors.map(error => onEErrors(error));
        } else {
            returnItem = onError(error);
        }
    }

    if (responseObject) {
        if (responseObject.code === 401) {
            return handlingAuthResponse(responseObject);
        }

        if (responseObject.errors) {
            returnItem = responseObject.errors.map(error => onEErrors(error));
        } else {
            returnItem = onResponse(response);
        }
    }

    return returnItem;
};

export const verifyStringObject = (value) => {
    if (typeof value === 'string') {
        let isParsed = true;

        try {
            JSON.parse(value);
        } catch (e) {
            isParsed = false;
        }
        
        if (isParsed) {
            return JSON.parse(value);
        }
    }
    
    return value;
};

export const knownErrors = (message) => {
    switch (message) {
        default:
            return message;
    }
};

export const isLogged = () => {
    return localStorage.getItem('token') !== 'null' &&
        localStorage.getItem('token') !== null;
};

export const authorization = () => {
    return {
        'Authorization': 'Bearer {token}'.replace(
            '{token}', localStorage.getItem('token'),
        ),
    };
};

export const money = (value) => {
	if (value <= 0 || isNaN(value)) return '-';
	
	return `R$ ${(value).toLocaleString('pt-BR', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
};

export const cloneObject = (object) => {
    return JSON.parse(JSON.stringify(object));
};
