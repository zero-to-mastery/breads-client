import { ADD_ERROR, REMOVE_ERROR, ADD_SUCCESS, REMOVE_ALERT } from '../actionTypes';

export default (state = { message: null, type: null }, action) => {
    switch (action.type) {
        case ADD_ERROR:
            return { ...state, message: action.error, type: 'danger' };
        case ADD_SUCCESS:
            return { ...state, message: action.success, type: 'success' };
        case REMOVE_ERROR:
            return { ...state, message: null, type: null };
        case REMOVE_ALERT:
            return { ...state, message: null, type: null };
        default:
            return state;
    }
};