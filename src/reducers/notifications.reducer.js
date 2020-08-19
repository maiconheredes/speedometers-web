import NotificationsState from '../states/notifications.state';
import { SET_NOTIFICATION, UNSET_NOTIFICATION } from '../types/action.type';


const NotificationsReducer = (state = NotificationsState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return [
                ...state,
                action.payload,
            ];
        case UNSET_NOTIFICATION:
            return state.filter(notification => notification.id !== action.payload.id)
        default:
            return state;
    }
};

export default NotificationsReducer;
