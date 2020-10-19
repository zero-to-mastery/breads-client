import { AppDispatch } from '../../app/store';
import { apiCall, setTokenHeader } from '../../common/services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import alerts from '../alerts';
import { AuthActionTypes, User } from './types';

const { addAlert } = alerts.actions;

export const setCurrentUser = (user: User): AuthActionTypes => ({
    type: SET_CURRENT_USER,
    payload: user
})

export function setAuthorizationToken(token: string | boolean): void {
    setTokenHeader(token);
}

export const logout = () => (dispatch: AppDispatch): void => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({
        id: null,
        username: null,
        image: null
    }));
}

export const authUser = (type: any, userData: any) => (dispatch: AppDispatch): Promise<any> => {
    return apiCall('post', `/auth/${type}`, userData)
        .then((data: any) => {
            const { token, ...user } = data;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token)
            dispatch(setCurrentUser(user));
        })
        .catch((err: any) => {
            dispatch(addAlert({message: err.message, type: 'danger'}));
        });
}

export const updateUser = (id: any, image: any, username: any) => (dispatch: AppDispatch): Promise<any> => {
    return apiCall('put', `/users/${id}`, {image, username})
        .then((user: any) => {
            dispatch(setCurrentUser(user));
            dispatch(addAlert({message: 'Successfully updated', type: 'success'}));
        })
        .catch((err: any) => dispatch(addAlert({message: err.message, type: 'danger'})));
}

export const sendResetEmail = (email: any) => (dispatch: AppDispatch): Promise<any> => {
    return apiCall('post', '/users/reset', { email })
        .then(() => {})
        .catch((err: any) => dispatch(addAlert({message: err.message, type: 'danger'})));
}

export const resetPassword = (username: any, token: any, password: any) => (dispatch: AppDispatch): Promise<any> => {
    return apiCall('post', `/users/${username}/reset/${token}`, { password })
        .then(() => {})
        .catch((err: any) => dispatch(addAlert({message: err.message, type: 'danger'})));
}