import { SET_CURRENT_USER } from '../actionTypes';
import { AuthActionTypes, AuthState } from './actions';

const initialState: AuthState = {
  isAuthenticated: false, // hopefully be true, when logged in
  user: {} // all the user info when logged in
};

export default (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            console.log(action?.payload);
            return {
                isAuthenticated: !!Object.keys(action.payload).length,
                user: action.payload
            };
        default:
            return state;
    }
};