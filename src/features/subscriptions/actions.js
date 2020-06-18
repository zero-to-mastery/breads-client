import { apiCall } from '../../common/services/api';
import errors from '../errors';
import { LOAD_SUBSCRIPTIONS, REMOVE_SUBSCRIPTIONS } from './actionTypes';

export const loadSubscriptions = users => ({
    type: LOAD_SUBSCRIPTIONS,
    users
});

export const removeSubscriptions = id => ({
    type: REMOVE_SUBSCRIPTIONS,
    id
});

export const removeSubscription = (sub_id, pub_id) => {
    return dispatch => {
        return apiCall('delete', `/users/${sub_id}/subscriptions/${pub_id}`)
            .then(() => {
                dispatch(removeSubscriptions(pub_id))
            })
            .catch(err => {
                dispatch(errors.actions.addError(err.message));
            });
    }
}

export const postNewSubscription = sub_id => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user.id;
    return apiCall('post', `/users/${user_id}/subscriptions`, { sub_id })
        .then(res => {})
        .catch(err => dispatch(errors.actions.addError(err.message)));
}

export const fetchSubscriptions = user_id => {
    return dispatch => {
        return apiCall('get', `/users/${user_id}/subscriptions`)
            .then(res => {
                dispatch(loadSubscriptions(res));
            })
            .catch(err => {
                dispatch(errors.actions.addError(err.message));
            });
    }
}
