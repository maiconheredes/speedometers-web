import LoadingState from '../states/loading.state';
import { ALTER_LOADING } from '../types/action.type';


const LoadingReducer = (state = LoadingState, action) => {
    switch (action.type) {
        case ALTER_LOADING:
            return state = action.payload;
        default:
            return state;
    }
};

export default LoadingReducer;
