import { combineReducers } from 'redux';

import LoadingReducer from './loading.reducer';
import ServicesReducer from './services.reducer';


const Reducers = combineReducers({
    LoadingReducer,
    ServicesReducer,
});

export default Reducers;
