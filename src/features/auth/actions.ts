import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppDispatch } from '../../app/store';
import { apiCall, setTokenHeader } from '../../common/services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import alerts from '../alerts';
import { RootState } from '../rootReducer';
import { AuthActionTypes, PromiseReturnTypes, User } from './types';

const { addAlert } = alerts.actions;

export const setCurrentUser = (user: User): AuthActionTypes => ({
    type: SET_CURRENT_USER,
    payload: user
})

/**
 * Wrapper for setToken in order to export as an action to App.tsx
 */
export function setAuthorizationToken(token: string | boolean): void {
    setTokenHeader(token);
}

export const logout = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch: AppDispatch): void => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({
        id: null,
        username: null,
        image: null
    }));
}

export const authUser = (type: any, userData: any): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch: AppDispatch): Promise<void> => {
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

export const updateUser = (id: any, image: any, username: any): ThunkAction<Promise<PromiseReturnTypes>, RootState, unknown, Action<string>> => async (dispatch: AppDispatch): Promise<PromiseReturnTypes> => {
    return apiCall('put', `/users/${id}`, {image, username})
        .then((user: any) => {
            dispatch(setCurrentUser(user));
            dispatch(addAlert({message: 'Successfully updated', type: 'success'}));
        })
        .catch((err: any) => dispatch(addAlert({message: err.message, type: 'danger'})));
}

export const sendResetEmail = (email: any): ThunkAction<Promise<PromiseReturnTypes>, RootState, unknown, Action<string>> => async (dispatch: AppDispatch): Promise<PromiseReturnTypes> => {
    return apiCall('post', '/auth/reset', { email })
        .then((res: any) => dispatch(addAlert({message: res.message, type: 'success'})))
        .catch((err: any) => dispatch(addAlert({message: err.message, type: 'danger'})));
}

export const resetPassword = (username: any, token: any, password: any): ThunkAction<Promise<PromiseReturnTypes>, RootState, unknown, Action<string>> => async (dispatch: AppDispatch): Promise<PromiseReturnTypes> => {
    return apiCall('post', `/auth/${username}/reset/${token}`, { password })
        .then((res: any) => dispatch(addAlert({message: res.message, type: 'success'})))
        .catch((err: any) => dispatch(addAlert({message: err.message, type: 'danger'})));
}