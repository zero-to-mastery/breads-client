import { apiCall, setTokenHeader } from '../../common/services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import alerts from '../alerts';
import { AxiosResponse } from 'axios';

const { addAlert } = alerts.actions;

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

export const setCurrentUser = (user: AuthState): SetCurrentUserAction => ({
    type: SET_CURRENT_USER,
    payload: user
})

export function setAuthorizationToken(token: string | boolean) {
    setTokenHeader(token);
}

export const logout = () => (dispatch: any) => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({
        isAuthenticated: false,
        user: {}
    }));
}

export const authUser = (type: any, userData: any) => (dispatch: any) => {
    // wrap thunk in promise so we can wait for API call
    return new Promise((resolve, reject) => {
        return apiCall('post', `/auth/${type}`, userData)
            .then((data: any) => {
                const { token, ...user } = data;
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token)
                dispatch(setCurrentUser(user));
                // dispatch(removeError());
                resolve(); // indicate that the API call succeeded
            })
            .catch(err => {
                dispatch(addAlert({message: err.message, type: 'danger'}));
                reject(); // indicate the API call failed
            });
    });
}

export const updateUser = (id: any, image: any, username: any) => (dispatch: any) => {
    return apiCall('put', `/users/${id}`, {image, username})
        .then((res: AxiosResponse<any>) => {
            dispatch(setCurrentUser(res.data.user));
            dispatch(addAlert({message: 'Successfully updated', type: 'success'}));
        })
        .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
}

export const sendResetEmail = (email: any) => (dispatch: any) => {
    return apiCall('post', '/users/reset', { email })
        .then(() => {})
        .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
}

export const resetPassword = (username: any, token: any, password: any) => (dispatch: any) => {
    return apiCall('post', `/users/${username}/reset/${token}`, { password })
        .then(() => {})
        .catch(err => dispatch(addAlert({message: err.message, type: 'danger'})));
}