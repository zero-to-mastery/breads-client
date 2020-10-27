import { apiCall } from '../../common/services/api';
import alerts from '../alerts';
import { LOAD_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from '../actionTypes';

const { addAlert } = alerts.actions

export const loadNotifications = notifications => ({
    type: LOAD_NOTIFICATIONS,
    notifications
});

export const removeNotifications = id => ({
    type: REMOVE_NOTIFICATIONS,
    id
});

export const fetchNotifications = () => {
    return (dispatch, getState) => {
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
}

export const updateNotifications = sub_id => {
    return (dispatch, getState) => {
        let {currentUser} = getState();
        const id = currentUser.user.id;
        return apiCall('put', `/users/${id}/notifications`)
            .then(() => dispatch(removeNotifications(sub_id)))
            .catch(err => {
                dispatch(addAlert({message: err.message, type: 'danger'}));
            });
    }
}