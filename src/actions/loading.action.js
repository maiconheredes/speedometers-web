import { ALTER_LOADING } from '../types/action.type';


export const alterLoading = (status) => {
    return {
        type: ALTER_LOADING,
        payload: status,
    };
};
