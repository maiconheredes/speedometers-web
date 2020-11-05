import {
    UPDATE_ENTITY_FIELD, 
    UPDATE_ENTITY,
} from '../types/action.type';


const updateObjectValue = (object, fields, value) => {
    let field = fields[0];
    let length = fields.length;
    
    fields.shift();
    
    if (object[field] instanceof Object && length > 1) {
        updateObjectValue(object[field], fields, value);
    } else {
        object[field] = value;
    }
};

const updateEntityField = (state, field, value) => {
    let fields = field.split('.');

    if (fields.length > 1) {
        updateObjectValue(state, fields, value);
    } else {
        state = {
            ...state,
            [field]: value,
        };
    }

    return state;
};

const EntityReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_ENTITY_FIELD:
            return updateEntityField(
                state, action.payload.field,
                action.payload.value
            );
        case UPDATE_ENTITY:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default EntityReducer;
