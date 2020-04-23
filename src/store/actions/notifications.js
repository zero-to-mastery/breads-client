import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_NOTIFICATIONS } from '../actionTypes';

export const loadNotifications = notifications => ({
    type: LOAD_NOTIFICATIONS,
    notifications
});

// display new subscriptions
export const fetchNotifications = () => {
    return (dispatch, getState) => {
        let {currentUser} = getState();
        const id = currentUser.user.id;
        return apiCall('get', `/users/${id}/notifications`)
            .then(res => {
                dispatch(loadNotifications(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export const updateNotifications = () => {
    return (dispatch, getState) => {
        let {currentUser} = getState();
        const id = currentUser.user.id;
        return apiCall('put', `/users/${id}/notifications`)
            .then(res => {})
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}