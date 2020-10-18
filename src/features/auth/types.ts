import { SET_CURRENT_USER } from '../actionTypes';

export interface AuthState {
    isAuthenticated: boolean
    user: {
        id?: number,
        username?: string,
        image?: string
    }
}

interface SetCurrentUserAction {
    type: typeof SET_CURRENT_USER
    payload: AuthState
}

export type AuthActionTypes = SetCurrentUserAction;