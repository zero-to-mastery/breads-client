import { SET_CURRENT_USER } from '../actionTypes';

export interface User {
    id: number | null
    username: string | null
    image: string | null
}

export interface AuthState {
    isAuthenticated: boolean
    user: User
}

interface SetCurrentUserAction {
    type: typeof SET_CURRENT_USER
    payload: User
}

export type AuthActionTypes = SetCurrentUserAction;