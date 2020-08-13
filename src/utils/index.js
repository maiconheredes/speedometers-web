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
