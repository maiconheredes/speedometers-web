import { combineReducers } from 'redux';

import LoadingReducer from './loading.reducer';
import ServicesReducer from './services.reducer';
import NotificationsReducer from './notifications.reducer';


const Reducers = combineReducers({
    LoadingReducer,
    ServicesReducer,
    NotificationsReducer,
});

export default Reducers;
