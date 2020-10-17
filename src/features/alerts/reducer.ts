import { ADD_ALERT, REMOVE_ALERT } from '../actionTypes';
import { AlertState, AlertActionTypes } from './types';

const initialState: AlertState = {
    message: null,
    type: null
}

/**
 * @todo Add functionality for multiple alerts to be displayed at the same time.
 */
export default (state = initialState, action: AlertActionTypes): AlertState => {
    switch (action.type) {
        case ADD_ALERT:
            return { ...state, ...action.payload };
        case REMOVE_ALERT:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};