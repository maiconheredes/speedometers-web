import uuid from 'react-uuid';

import { 
    SET_NOTIFICATION, 
    UNSET_NOTIFICATION,
} from '../types/action.type';


export const setNotification = ({
    title,
    message,
    onConfirm = () => { },
    onClose = () => { },
    close = true,
}) => {
    return {
        type: SET_NOTIFICATION,
        payload: {
            id: uuid(),
            title,
            message,
            onConfirm,
            onClose,
            close,
        }
    };
};

export const unsetNotification = (notification) => {
    return {
        type: UNSET_NOTIFICATION,
        payload: notification,
    };
};
