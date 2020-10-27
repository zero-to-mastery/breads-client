import { apiCall } from '../../common/services/api';
import alerts from '../alerts';
import { LOAD_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from '../actionTypes';
import { NotificationActionTypes, PromiseReturnTypes, NotificationType } from './types';
import { AppDispatch } from '../../app/store';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';
import { Action } from 'redux';

const { addAlert } = alerts.actions

export const loadNotifications = (notifications: NotificationType): NotificationActionTypes => ({
    type: LOAD_NOTIFICATIONS,
    payload: {
        notifications
    }
});

export const removeNotifications = (id: any): NotificationActionTypes => ({
    type: REMOVE_NOTIFICATIONS,
    id
});

export const fetchNotifications = (): ThunkAction<Promise<PromiseReturnTypes>, RootState, unknown, Action<string>> => async (dispatch: AppDispatch, getState: any): Promise<PromiseReturnTypes> => {
    let {currentUser} = getState();
    const id = currentUser.user.id;
    return apiCall('get', `/users/${id}/notifications`)
        .then(res => {
            dispatch(loadNotifications(res));
        })
        .catch(err => {
            dispatch(addAlert({message: err.message, type: 'danger'}));
        });
}

export const updateNotifications = (sub_id: any): ThunkAction<Promise<PromiseReturnTypes>, RootState, unknown, Action<string>> => async (dispatch: AppDispatch, getState: any): Promise<PromiseReturnTypes> => {
    let {currentUser} = getState();
    const id = currentUser.user.id;
    return apiCall('put', `/users/${id}/notifications`)
        .then(() => dispatch(removeNotifications(sub_id)))
        .catch(err => {
            dispatch(addAlert({message: err.message, type: 'danger'}));
        });
}